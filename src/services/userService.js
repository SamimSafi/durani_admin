const userService = {
  filterUsers: (users, searchTerm, hasLogo) => {
    let filtered = users;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (hasLogo) {
      filtered = filtered.filter((user) => user.hasLogo); // Adjust based on your user data
    }
    return filtered;
  },

  sortUsers: (users, sortOrder) => {
    return [...users].sort((a, b) => {
      const comparison = a.username.localeCompare(b.username);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateUsers: (users, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return users.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default userService;