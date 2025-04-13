function searchItems(array, query) {
    const searchQuery = query.toLowerCase();

    return array.filter(item =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery) ||
        item.date.toLowerCase().includes(searchQuery)
    );
}
