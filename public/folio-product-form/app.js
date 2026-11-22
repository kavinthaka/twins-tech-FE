const $ = id => document.getElementById(id);
const icons = {
 box:'<path d="m3 7 9-5 9 5-9 5zM3 7v10l9 5 9-5V7M12 12v10M7 5l9 5"/>',
 tag:'<path d="M3 3h8l10 10-8 8L3 11z"/><circle cx="7.5" cy="7.5" r="1"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/>',
 upload:'<path d="M7 18H6a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11h-1M12 20V10m-4 4 4-4 4 4"/>',
 layers:'<path d="m2 7 10-5 10 5-10 5zM3 12l9 5 9-5M3 17l9 5 9-5"/>'
};
document.querySelectorAll('[data-i]').forEach(el=>el.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24">'+icons[el.dataset.i]+'</svg>');
const form=$('form'), list=$('list');
const getRecords=()=>JSON.parse(localStorage.getItem('folio-products')||'[]');
let current=null, photo='';
function button(label,action){
 const b=document.createElement('button'); b.type='button'; b.className='secondary'; b.textContent=label; b.onclick=action;return b;
}
function showPhoto(){
 const area=$('preview');area.replaceChildren();
 if(!photo)return;
 const img=new Image();img.alt='Selected product image';img.className='thumb';img.src=photo;
 area.append(img,button('Remove image',()=>{photo='';showPhoto()}));
}
function setHint(){
 $('hint').textContent={Draft:'Keep this product as a draft while you work.',Active:'Mark this product as active in your catalog.',Archived:'Keep this product in your archived inventory.'}[$('status').value];
}
function editor(record){
 form.reset(); current=record?.id||null;photo=record?.photo||'';
 if(record) for(const field of form.elements) if(field.name) field.value=record[field.name]??'';
 setHint();showPhoto();form.hidden=false;list.hidden=true;
 $('title').textContent=$('crumb').textContent=current?'Edit product':'Add product';
 $('sub').textContent=current?'Update the details for this product.':'Enter product details to add an item to your catalog.';$('msg').textContent='';window.scrollTo(0,0);
}
function catalog(){
 const records=getRecords();form.hidden=true;list.hidden=false;
 $('title').textContent='Product catalog';$('crumb').textContent='All products';$('sub').textContent='Manage the products saved in this browser.';
 const head=document.createElement('div');head.className='mx';const h=document.createElement('h2');h.textContent='Products ('+records.length+')';head.append(h,button('Add product',()=>editor(null)));list.replaceChildren(head);
 if(!records.length){const p=document.createElement('p');p.textContent='Your catalog is empty. Add your first product to get started.';list.append(p)}
 for(const p of records){const row=document.createElement('div');row.className='entry';const info=document.createElement('div');const name=document.createElement('b');name.textContent=p.name;const meta=document.createElement('div');meta.className='muted';meta.textContent=[p.category,'LKR '+Number(p.price).toLocaleString(),p.status].join(' · ');info.append(name,meta);row.append(info,button('Edit',()=>editor(p)));list.append(row)}
 $('msg').textContent='';window.scrollTo(0,0);
}
async function readPhoto(file){
 if(!file)return;
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2097152){$('msg').textContent='Choose a PNG, JPG or WebP image under 2 MB.';return}
 $('save').disabled=true;
 try{const bitmap=await createImageBitmap(file);const scale=Math.min(1,900/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);photo=canvas.toDataURL('image/webp',.8);bitmap.close();showPhoto();$('msg').textContent=''}catch{$('msg').textContent='This image could not be read.'}finally{$('save').disabled=false}
}
$('upload').onclick=()=>$('file').click();$('file').onchange=e=>{readPhoto(e.target.files[0]);e.target.value=''};
$('upload').ondragover=e=>e.preventDefault();$('upload').ondrop=e=>{e.preventDefault();readPhoto(e.dataTransfer.files[0])};
$('status').onchange=setHint;$('cancel').onclick=$('catalog').onclick=catalog;
form.onsubmit=e=>{e.preventDefault();const product=Object.fromEntries(new FormData(form));product.name=product.name.trim();if(!product.name){$('name').focus();$('msg').textContent='Enter a product name.';return}product.id=current||crypto.randomUUID();product.photo=photo;product.stock=product.stock||'0';
 try{const records=getRecords().filter(p=>p.id!==product.id);records.unshift(product);localStorage.setItem('folio-products',JSON.stringify(records));catalog();$('msg').textContent='Product saved.'}catch{$('msg').textContent='Browser storage is unavailable or full. Try a smaller image and save again.'}
};
