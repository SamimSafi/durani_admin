const missionService = {
  filterMission: (mission, searchTerm) => {
    let filtered = mission;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((mission) =>
        mission.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortMission: (mission, sortOrder) => {
    return [...mission].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateMission: (mission, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return mission.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default missionService;