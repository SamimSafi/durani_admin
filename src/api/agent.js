import axiosInstance from './axios';

// Client-related API endpoints

// Auth API calls
const AuthAPI = {
  signIn: async (credentials) => {
    const response = await axiosInstance.post('/auth/signIn', credentials);
    return response.data; // Returns { accessToken: "..." }
  },
  refreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post(`/auth/refresh-token/${ refreshToken }`);
      return response.data; // Expect { accessToken, refreshToken }
    } catch (error) {
      console.error('agent.Auth.refreshToken error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};

// User API calls
const UserAPI = {
    fetchUsers: async ({ pageSize, pageIndex, search }) => {
    const response = await axiosInstance.post('/user/findAll', {
      pageSize,
      pageIndex,
      search,
    });
    return response.data;
  },
  createUser: async (userData) => {
    const response = await axiosInstance.post('/user', userData);
    return response.data;
  },
   updateUser: async (id, userData) => {
    const response = await axiosInstance.patch(`/user/${id}`, userData);
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  },
  getUser: async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  },
};

// History API calls
const HistoryAPI = {
    fetchHistorys: async () => {
    const response = await axiosInstance.get('/history');
    return response.data;
  },
  createHistory: async (HistoryData) => {
    const response = await axiosInstance.post('/history', HistoryData);
    return response.data;
  },
   updateHistory: async (id, HistoryData) => {
    const response = await axiosInstance.put(`/history/${id}`, HistoryData);
    return response.data;
  },
  deleteHistory: async (HistoryId) => {
    const response = await axiosInstance.delete(`/history/${HistoryId}`);
    return response.data;
  },
  getHistory: async (HistoryId) => {
    const response = await axiosInstance.get(`/history/${HistoryId}`);
    return response.data;
  },
   activateHistory: async (id) => {
    const response = await axiosInstance.post(`/history/${id}/activate`);
    return response.data;
  },
  deactivateHistory: async (id) => {
    const response = await axiosInstance.post(`/history/${id}/deactivate`);
    return response.data;
  },
   updateHistoryImage: async (id, logoFile) => {
    const formData = new FormData();
    formData.append('image', logoFile);
    const response = await axiosInstance.post(`/history/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
};

// LeaderShip API calls
const LeadershipAPI = {
    fetchLeadership: async () => {
    const response = await axiosInstance.get('/leadership');
    return response.data;
  },
  createLeadership: async (LeadershipData) => {
   const response = await axiosInstance.post('/leadership', LeadershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateLeadership: async (id, LeadershipData) => {
    const response = await axiosInstance.put(`/leadership/${id}`, LeadershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteLeadership: async (LeadershipId) => {
    const response = await axiosInstance.delete(`/leadership/${LeadershipId}`);
    return response.data;
  },
  getLeadership: async (LeadershipId) => {
    const response = await axiosInstance.get(`/leadership/${LeadershipId}`);
    return response.data;
  },
   activateLeadership: async (id) => {
    const response = await axiosInstance.post(`/leadership/${id}/activate`);
    return response.data;
  },
  deactivateLeadership: async (id) => {
    const response = await axiosInstance.post(`/leadership/${id}/deactivate`);
    return response.data;
  },
  
};

// Mission API calls
const MissionAPI = {
    fetchMission: async () => {
    const response = await axiosInstance.get('/mission');
    return response.data;
  },
  createMission: async (MissionData) => {
    const response = await axiosInstance.post('/mission', MissionData);
    return response.data;
  },
   updateMission: async (id, MissionData) => {
    const response = await axiosInstance.put(`/mission/${id}`, MissionData);
    return response.data;
  },
  deleteMission: async (MissionId) => {
    const response = await axiosInstance.delete(`/mission/${MissionId}`);
    return response.data;
  },
  getMission: async (MissionId) => {
    const response = await axiosInstance.get(`/mission/${MissionId}`);
    return response.data;
  },
   activateMission: async (id) => {
    const response = await axiosInstance.post(`/mission/${id}/activate`);
    return response.data;
  },
  deactivateMission: async (id) => {
    const response = await axiosInstance.post(`/mission/${id}/deactivate`);
    return response.data;
  },
  
};

const PartnershipAPI = {
    fetchPartnership: async () => {
    const response = await axiosInstance.get('/partnership');
    return response.data;
  },
  createPartnership: async (PartnershipData) => {
   const response = await axiosInstance.post('/partnership', PartnershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updatePartnership: async (id, PartnershipData) => {
    const response = await axiosInstance.put(`/partnership/${id}`, PartnershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deletePartnership: async (PartnershipId) => {
    const response = await axiosInstance.delete(`/partnership/${PartnershipId}`);
    return response.data;
  },
  getPartnership: async (PartnershipId) => {
    const response = await axiosInstance.get(`/partnership/${PartnershipId}`);
    return response.data;
  },
   activatePartnership: async (id) => {
    const response = await axiosInstance.post(`/partnership/${id}/activate`);
    return response.data;
  },
  deactivatePartnership: async (id) => {
    const response = await axiosInstance.post(`/partnership/${id}/deactivate`);
    return response.data;
  },
  
};

// Services API calls
const ServicesAPI = {
    fetchServices: async () => {
    const response = await axiosInstance.get('/services');
    return response.data;
  },
  createServices: async (ServicesData) => {
   const response = await axiosInstance.post('/services', ServicesData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateServices: async (id, ServicesData) => {
    const response = await axiosInstance.put(`/services/${id}`, ServicesData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteServices: async (ServicesId) => {
    const response = await axiosInstance.delete(`/services/${ServicesId}`);
    return response.data;
  },
  getServices: async (ServicesId) => {
    const response = await axiosInstance.get(`/services/${ServicesId}`);
    return response.data;
  },
   activateServices: async (id) => {
    const response = await axiosInstance.post(`/services/${id}/activate`);
    return response.data;
  },
  deactivateServices: async (id) => {
    const response = await axiosInstance.post(`/services/${id}/deactivate`);
    return response.data;
  },
  
};

// Services API calls
const ContentAPI = {
    fetchContent: async () => {
    const response = await axiosInstance.get('/content');
    return response.data;
  },
  createContent: async (ContentData) => {
   const response = await axiosInstance.post('/content', ContentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateContent: async (id, ContentData) => {
    const response = await axiosInstance.put(`/content/${id}`, ContentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteContent: async (ContentId) => {
    const response = await axiosInstance.delete(`/content/${ContentId}`);
    return response.data;
  },
  getContent: async (ContentId) => {
    const response = await axiosInstance.get(`/content/${ContentId}`);
    return response.data;
  },
   activateContent: async (id) => {
    const response = await axiosInstance.post(`/content/${id}/activate`);
    return response.data;
  },
  deactivateContent: async (id) => {
    const response = await axiosInstance.post(`/content/${id}/deactivate`);
    return response.data;
  },
  
};

// Sliders API calls
const SlidersAPI = {
    fetchSliders: async () => {
    const response = await axiosInstance.get('/sliders');
    return response.data;
  },
  createSliders: async (SlidersData) => {
   const response = await axiosInstance.post('/sliders', SlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateSliders: async (id, SlidersData) => {
    const response = await axiosInstance.put(`/sliders/${id}`, SlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteSliders: async (SlidersId) => {
    const response = await axiosInstance.delete(`/sliders/${SlidersId}`);
    return response.data;
  },
  getSliders: async (SlidersId) => {
    const response = await axiosInstance.get(`/sliders/${SlidersId}`);
    return response.data;
  },
   activateSliders: async (id) => {
    const response = await axiosInstance.post(`/sliders/${id}/activate`);
    return response.data;
  },
  deactivateSliders: async (id) => {
    const response = await axiosInstance.post(`/sliders/${id}/deactivate`);
    return response.data;
  },
  
};


// SuccessSnapshots API calls
const SuccessSnapshotsAPI = {
    fetchSuccessSnapshots: async () => {
    const response = await axiosInstance.get('/success-snapshots');
    return response.data;
  },
  createSuccessSnapshots: async (SuccessSnapshotsData) => {
    const response = await axiosInstance.post('/success-snapshots', SuccessSnapshotsData);
    return response.data;
  },
   updateSuccessSnapshots: async (id, SuccessSnapshotsData) => {
    const response = await axiosInstance.put(`/success-snapshots/${id}`, SuccessSnapshotsData);
    return response.data;
  },
  deleteSuccessSnapshots: async (SuccessSnapshotsId) => {
    const response = await axiosInstance.delete(`/success-snapshots/${SuccessSnapshotsId}`);
    return response.data;
  },
  getSuccessSnapshots: async (SuccessSnapshotsId) => {
    const response = await axiosInstance.get(`/success-snapshots/${SuccessSnapshotsId}`);
    return response.data;
  },
   activateSuccessSnapshots: async (id) => {
    const response = await axiosInstance.post(`/success-snapshots/${id}/activate`);
    return response.data;
  },
  deactivateSuccessSnapshots: async (id) => {
    const response = await axiosInstance.post(`/success-snapshots/${id}/deactivate`);
    return response.data;
  },
  
};

// Projects API calls
const ProjectsAPI = {
    fetchProjects: async () => {
    const response = await axiosInstance.get('/projects');
    return response.data;
  },
  createProjects: async (ProjectsData) => {
   const response = await axiosInstance.post('/projects', ProjectsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateProjects: async (id, ProjectsData) => {
    const response = await axiosInstance.put(`/projects/${id}`, ProjectsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteProjects: async (ProjectsId) => {
    const response = await axiosInstance.delete(`/projects/${ProjectsId}`);
    return response.data;
  },
  getProjects: async (ProjectsId) => {
    const response = await axiosInstance.get(`/projects/${ProjectsId}`);
    return response.data;
  },
   activateProjects: async (id) => {
    const response = await axiosInstance.post(`/projects/${id}/activate`);
    return response.data;
  },
  deactivateProjects: async (id) => {
    const response = await axiosInstance.post(`/projects/${id}/deactivate`);
    return response.data;
  },
  
};

// ProjectCategories API calls
const ProjectCategoriesAPI = {
    fetchProjectCategories: async () => {
    const response = await axiosInstance.get('/project-categories');
    return response.data;
  },
  createProjectCategories: async (ProjectCategoriesData) => {
    const response = await axiosInstance.post('/project-categories', ProjectCategoriesData);
    return response.data;
  },
   updateProjectCategories: async (id, ProjectCategoriesData) => {
    const response = await axiosInstance.put(`/project-categories/${id}`, ProjectCategoriesData);
    return response.data;
  },
  deleteProjectCategories: async (ProjectCategoriesId) => {
    const response = await axiosInstance.delete(`/project-categories/${ProjectCategoriesId}`);
    return response.data;
  },
  getProjectCategories: async (ProjectCategoriesId) => {
    const response = await axiosInstance.get(`/project-categories/${ProjectCategoriesId}`);
    return response.data;
  },
   activateProjectCategories: async (id) => {
    const response = await axiosInstance.post(`/project-categories/${id}/activate`);
    return response.data;
  },
  deactivateProjectCategories: async (id) => {
    const response = await axiosInstance.post(`/project-categories/${id}/deactivate`);
    return response.data;
  },
  
};

// Product API calls
const ProductAPI = {
    fetchProduct: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },
  createProduct: async (ProductData) => {
   const response = await axiosInstance.post('/products', ProductData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateProduct: async (id, ProductData) => {
    const response = await axiosInstance.put(`/products/${id}`, ProductData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteProduct: async (ProductId) => {
    const response = await axiosInstance.delete(`/products/${ProductId}`);
    return response.data;
  },
  getProduct: async (ProductId) => {
    const response = await axiosInstance.get(`/products/${ProductId}`);
    return response.data;
  },
   activateProduct: async (id) => {
    const response = await axiosInstance.post(`/products/${id}/activate`);
    return response.data;
  },
  deactivateProduct: async (id) => {
    const response = await axiosInstance.post(`/products/${id}/deactivate`);
    return response.data;
  },
  
};

// ProjectCategories API calls
const ProductCategoryAPI = {
    fetchProductCategory: async () => {
    const response = await axiosInstance.get('/product-categories');
    return response.data;
  },
  createProductCategory: async (ProductCategoryData) => {
    const response = await axiosInstance.post('/product-categories', ProductCategoryData);
    return response.data;
  },
   updateProductCategory: async (id, ProductCategoryData) => {
    const response = await axiosInstance.put(`/product-categories/${id}`, ProductCategoryData);
    return response.data;
  },
  deleteProductCategory: async (ProductCategoryId) => {
    const response = await axiosInstance.delete(`/product-categories/${ProductCategoryId}`);
    return response.data;
  },
  getProductCategory: async (ProductCategoryId) => {
    const response = await axiosInstance.get(`/product-categories/${ProductCategoryId}`);
    return response.data;
  },
  
};


const ProjectGoalsAPI = {
    fetchProjectGoals: async (projectId) => {
    const response = await axiosInstance.get(`/project-goals/project/${projectId}`,{isActive:true,projectId:projectId});
    return response.data;
  },
  createProjectGoals: async (ProjectGoalsData) => {
   const response = await axiosInstance.post('/project-goals', ProjectGoalsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateProjectGoals: async (id, ProjectGoalsData) => {
    const response = await axiosInstance.put(`/project-goals/${id}`, ProjectGoalsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteProjectGoals: async (ProjectGoalsId) => {
    const response = await axiosInstance.delete(`/project-goals/${ProjectGoalsId}`);
    return response.data;
  },
  getProjectGoals: async (ProjectGoalsId) => {
    const response = await axiosInstance.get(`/project-goals/${ProjectGoalsId}`);
    return response.data;
  },
   activateProjectGoals: async (id) => {
    const response = await axiosInstance.post(`/project-goals/${id}/activate`);
    return response.data;
  },
  deactivateProjectGoals: async (id) => {
    const response = await axiosInstance.post(`/project-goals/${id}/deactivate`);
    return response.data;
  },
  
};

const ProjectSlidersAPI = {
    fetchProjectSliders: async (projectId) => {
    const response = await axiosInstance.get(`/project-sliders/project/${projectId}`);
    return response.data;
  },
  createProjectSliders: async (ProjectSlidersData) => {
   const response = await axiosInstance.post('/project-sliders', ProjectSlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateProjectSliders: async (id, ProjectSlidersData) => {
    const response = await axiosInstance.put(`/project-sliders/${id}`, ProjectSlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteProjectSliders: async (ProjectSlidersId) => {
    const response = await axiosInstance.delete(`/project-sliders/${ProjectSlidersId}`);
    return response.data;
  },
  getProjectSliders: async (ProjectSlidersId) => {
    const response = await axiosInstance.get(`/project-sliders/${ProjectSlidersId}`);
    return response.data;
  },
   activateProjectSliders: async (id) => {
    const response = await axiosInstance.post(`/project-sliders/${id}/activate`);
    return response.data;
  },
  deactivateProjectSliders: async (id) => {
    const response = await axiosInstance.post(`/project-sliders/${id}/deactivate`);
    return response.data;
  },
  
};

// ProjectFinalOutcomes API calls
const ProjectFinalOutcomesAPI = {
    fetchProjectFinalOutcomes: async (projectId) => {
    const response = await axiosInstance.get(`/project-final-outcomes/project/${projectId}`);
    return response.data;
  },
  createProjectFinalOutcomes: async (ProjectFinalOutcomesData) => {
   const response = await axiosInstance.post('/project-final-outcomes', ProjectFinalOutcomesData);
    return response.data;
  },
   updateProjectFinalOutcomes: async (id, ProjectFinalOutcomesData) => {
    const response = await axiosInstance.put(`/project-final-outcomes/${id}`, ProjectFinalOutcomesData);
    return response.data;
  },
  deleteProjectFinalOutcomes: async (ProjectFinalOutcomesId) => {
    const response = await axiosInstance.delete(`/project-final-outcomes/${ProjectFinalOutcomesId}`);
    return response.data;
  },
  getProjectFinalOutcomes: async (ProjectFinalOutcomesId) => {
    const response = await axiosInstance.get(`/project-final-outcomes/${ProjectFinalOutcomesId}`);
    return response.data;
  },
   activateProjectFinalOutcomes: async (id) => {
    const response = await axiosInstance.post(`/project-final-outcomes/${id}/activate`);
    return response.data;
  },
  deactivateProjectFinalOutcomes: async (id) => {
    const response = await axiosInstance.post(`/project-final-outcomes/${id}/deactivate`);
    return response.data;
  },
  
};

// CompanyInfo API calls
const CompanyInfoAPI = {
  fetchCompanyInfo: async () => {
    const response = await axiosInstance.get('/company-info');
    return response.data;
  },
  createCompanyInfo: async (CompanyInfoData) => {
    const response = await axiosInstance.post('/company-info', CompanyInfoData);
    return response.data;
  },
  updateCompanyInfo: async (id, CompanyInfoData) => {
    const response = await axiosInstance.put(`/company-info/${id}`, CompanyInfoData);
    return response.data;
  },
  deleteCompanyInfo: async (CompanyInfoId) => {
    const response = await axiosInstance.delete(`/company-info/${CompanyInfoId}`);
    return response.data;
  },
  getCompanyInfo: async (CompanyInfoId) => {
    const response = await axiosInstance.get(`/company-info/${CompanyInfoId}`);
    return response.data;
  },
  activateCompanyInfo: async (id) => {
    const response = await axiosInstance.post(`/company-info/${id}/activate`);
    return response.data;
  },
  deactivateCompanyInfo: async (id) => {
    const response = await axiosInstance.post(`/company-info/${id}/deactivate`);
    return response.data;
  },
  updateCompanyLogo: async (id, logoFile) => {
    const formData = new FormData();
    formData.append('logo', logoFile);
    const response = await axiosInstance.put(`/company-info/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updateCompanyCoverPhoto: async (id, coverPhotoFile) => {
    const formData = new FormData();
    formData.append('cover', coverPhotoFile);
    const response = await axiosInstance.put(`/company-info/${id}/cover-photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Bio API calls
const BioAPI = {
    fetchBio: async () => {
    const response = await axiosInstance.get('/bio');
    return response.data;
  },
  createBio: async (BioData) => {
    const response = await axiosInstance.post('/bio', BioData);
    return response.data;
  },
   updateBio: async (id, BioData) => {
    const response = await axiosInstance.put(`/bio/${id}`, BioData);
    return response.data;
  },
  deleteBio: async (BioId) => {
    const response = await axiosInstance.delete(`/bio/${BioId}`);
    return response.data;
  },
  getBio: async (BioId) => {
    const response = await axiosInstance.get(`/bio/${BioId}`);
    return response.data;
  },
   activateBio: async (id) => {
    const response = await axiosInstance.post(`/bio/${id}/activate`);
    return response.data;
  },
  deactivateBio: async (id) => {
    const response = await axiosInstance.post(`/bio/${id}/deactivate`);
    return response.data;
  },
  
};


// Team API calls
const TeamAPI = {
  fetchTeam: async () => {
    const response = await axiosInstance.get('/team');
    return response.data;
  },
  createTeam: async (TeamData) => {
    const response = await axiosInstance.post('/team', TeamData);
    return response.data;
  },
  updateTeam: async (id, TeamData) => {
    const response = await axiosInstance.put(`/team/${id}`, TeamData);
    return response.data;
  },
  deleteTeam: async (TeamId) => {
    const response = await axiosInstance.delete(`/team/${TeamId}`);
    return response.data;
  },
  getTeam: async (TeamId) => {
    const response = await axiosInstance.get(`/team/${TeamId}`);
    return response.data;
  },
  activateTeam: async (id) => {
    const response = await axiosInstance.post(`/team/${id}/activate`);
    return response.data;
  },
  deactivateTeam: async (id) => {
    const response = await axiosInstance.post(`/team/${id}/deactivate`);
    return response.data;
  },
  updateTeamImage: async (id, logoFile) => {
    const formData = new FormData();
    formData.append('image', logoFile);
    const response = await axiosInstance.put(`/team/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

const JobPostingsAPI = {
  fetchJobPostings: async () => {
    const response = await axiosInstance.get('/job-postings');
    return response.data;
  },
  createJobPosting: async (jobPostingData) => {
    const response = await axiosInstance.post('/job-postings', jobPostingData);
    return response.data;
  },
  updateJobPosting: async (id, jobPostingData) => {
    const response = await axiosInstance.put(`/job-postings/${id}`, jobPostingData);
    return response.data;
  },
  deleteJobPosting: async (jobPostingId) => {
    const response = await axiosInstance.delete(`/job-postings/${jobPostingId}`);
    return response.data;
  },
  getJobPosting: async (jobPostingId) => {
    const response = await axiosInstance.get(`/job-postings/${jobPostingId}`);
    return response.data;
  },
  activateJobPosting: async (id) => {
    const response = await axiosInstance.post(`/job-postings/${id}/activate`);
    return response.data;
  },
  deactivateJobPosting: async (id) => {
    const response = await axiosInstance.post(`/job-postings/${id}/deactivate`);
    return response.data;
  },
};
const ContactAPI = {
  fetchContact: async () => {
    const response = await axiosInstance.get('/contact');
    return response.data;
  },
  deleteContact: async (jobPostingId) => {
    const response = await axiosInstance.delete(`/contact/${jobPostingId}`);
    return response.data;
  },
};

// ProjectFinalOutcomes API calls
const WhyChooseUsAPI = {
    fetchWhyChooseUs: async () => {
    const response = await axiosInstance.get(`/why-choose-us`);
    return response.data;
  },
  createWhyChooseUs: async (WhyChooseUsData) => {
   const response = await axiosInstance.post('/why-choose-us', WhyChooseUsData);
    return response.data;
  },
   updateWhyChooseUs: async (id, WhyChooseUsData) => {
    const response = await axiosInstance.put(`/why-choose-us/${id}`, WhyChooseUsData);
    return response.data;
  },
  deleteWhyChooseUs: async (WhyChooseUsId) => {
    const response = await axiosInstance.delete(`/why-choose-us/${WhyChooseUsId}`);
    return response.data;
  },
  getWhyChooseUs: async (WhyChooseUsId) => {
    const response = await axiosInstance.get(`/why-choose-us/${WhyChooseUsId}`);
    return response.data;
  },
   activateWhyChooseUs: async (id) => {
    const response = await axiosInstance.post(`/why-choose-us/${id}/activate`);
    return response.data;
  },
  deactivateWhyChooseUs: async (id) => {
    const response = await axiosInstance.post(`/why-choose-us/${id}/deactivate`);
    return response.data;
  },
  
};

// Slogan API calls
const SloganAPI = {
    fetchSlogan: async () => {
    const response = await axiosInstance.get('/slogans');
    return response.data;
  },
  createSlogan: async (SloganData) => {
    const response = await axiosInstance.post('/slogans', SloganData);
    return response.data;
  },
   updateSlogan: async (id, SloganData) => {
    const response = await axiosInstance.put(`/slogans/${id}`, SloganData);
    return response.data;
  },
  deleteSlogan: async (SloganId) => {
    const response = await axiosInstance.delete(`/slogans/${SloganId}`);
    return response.data;
  },
  getSlogan: async (SloganId) => {
    const response = await axiosInstance.get(`/slogans/${SloganId}`);
    return response.data;
  },
  updateSloganImage: async (id, logoFile) => {
    const formData = new FormData();
    formData.append('image', logoFile);
    const response = await axiosInstance.put(`/slogans/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Centralized agent exporting all resource APIs
const agent = {
  Auth:AuthAPI,
  // Add other resource APIs here (e.g., Products, Users)
  // Products: ProductAPI,
  Users: UserAPI,
  History: HistoryAPI,
  Leadership: LeadershipAPI,
  Partnership: PartnershipAPI,
  Mission: MissionAPI,
  Services: ServicesAPI,
  Sliders: SlidersAPI,
  SuccessSnapshots: SuccessSnapshotsAPI,
  Projects: ProjectsAPI,
  ProjectCategories: ProjectCategoriesAPI,
 ProjectGoals: ProjectGoalsAPI,
 ProjectSliders: ProjectSlidersAPI,
 Bio: BioAPI,
 CompanyInfo: CompanyInfoAPI,
 Team: TeamAPI,
 JopPosting: JobPostingsAPI,
 ProjectFinalOutcomes: ProjectFinalOutcomesAPI,
 Contact: ContactAPI,
 WhyChooseUs: WhyChooseUsAPI,
 Content: ContentAPI,
 ProductCategory: ProductCategoryAPI,
 Product: ProductAPI,
 Slogan: SloganAPI,
};

export default agent;