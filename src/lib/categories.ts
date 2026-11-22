export const categories = [
    { slug: 'ram', label: 'Ram' },
    { slug: 'graphic-cards', label: 'Graphic Cards' },
    { slug: 'laptops', label: 'Laptops' },
    { slug: 'hard-disks', label: 'Hard Disks' },
] as const;

export function categorySlug(category: string) {
    return category.trim().toLowerCase().replace(/\s+/g, '-');
}
