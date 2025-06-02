const teamService = {
  filterTeam: (team, searchTerm) => {
    let filtered = team;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortTeam: (team, sortOrder) => {
    return [...team].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateTeam: (team, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return team.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default teamService;