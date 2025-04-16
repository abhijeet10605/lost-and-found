export function searchItems(array, query) {
    const searchQuery = query.toLowerCase();

    return array.filter(item =>
        (typeof item.itemName === 'string' && item.itemName.toLowerCase().includes(searchQuery)) ||
        (typeof item.location === 'string' && item.location.toLowerCase().includes(searchQuery)) ||
        (typeof item.date === 'string' && item.date.toLowerCase().includes(searchQuery)) ||
        (typeof item.uniqueId === 'string' && item.uniqueId.toLowerCase().includes(searchQuery))
    );
}
