const contactService = {
  filterContact: (contact, searchTerm) => {
    let filtered = contact;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortContact: (contact, sortOrder) => {
    return [...contact].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateContact: (contact, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return contact.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default contactService;