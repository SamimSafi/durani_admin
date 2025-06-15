import  { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute
/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const Error = lazy(() => import('../views/authentication/Error'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));

// system component path
const HistoryList = lazy(() => import('../views/history/HistoryList'));
const HistoryForm = lazy(() => import('../views/history/HistoryForm'));
const HistoryImageForm = lazy(() => import('../views/history/HistoryImageForm'));

const UserList = lazy(() => import('../views/users/UserList'));
const UserForm = lazy(() => import('../views/users/UserForm'));

const LeadershipList = lazy(() => import('../views/leadership/LeadershipList'));
const LeadershipForm = lazy(() => import('../views/leadership/LeadershipForm'));

const MissionList = lazy(() => import('../views/mission/MissionList'));
const MissionForm = lazy(() => import('../views/mission/MissionForm'));

const PartnershipList = lazy(() => import('../views/partnership/PartnershipList'));
const PartnershipForm = lazy(() => import('../views/partnership/PartnershipForm'));

const ServicesList = lazy(() => import('../views/services/ServicesList'));
const ServicesForm = lazy(() => import('../views/services/ServicesForm'));

const SlidersList = lazy(() => import('../views/sliders/SlidersList'));
const SlidersForm = lazy(() => import('../views/sliders/SlidersForm'));

const ProjectsList = lazy(() => import('../views/projects/ProjectsList'));
const ProjectsForm = lazy(() => import('../views/projects/ProjectsForm'));

const ProjectGoalsList = lazy(() => import('../views/projectGoals/ProjectGoalsList'));
const ProjectGoalsForm = lazy(() => import('../views/projectGoals/ProjectGoalsForm'));

const ProjectFinalOutcomesList = lazy(() => import('../views/projectFinalOutcomes/ProjectFinalOutcomesList'));
const ProjectFinalOutcomesForm = lazy(() => import('../views/projectFinalOutcomes/ProjectFinalOutcomesForm'));

const ProjectSlidersList = lazy(() => import('../views/projectSliders/ProjectSlidersList'));
const ProjectSlidersForm = lazy(() => import('../views/projectSliders/ProjectSlidersForm'));

const ProjectCategoriesList = lazy(() => import('../views/projectCategories/ProjectCategoriesList'));
const ProjectCategoriesForm = lazy(() => import('../views/projectCategories/ProjectCategoriesForm'));

const ProductCategoryList = lazy(() => import('../views/productCategory/ProductCategoryList'));
const ProductCategoryForm = lazy(() => import('../views/productCategory/ProductCategoryForm'));

const ProductList = lazy(() => import('../views/product/ProductList'));
const ProductForm = lazy(() => import('../views/product/ProductForm'));

const SuccessSnapshotsList = lazy(() => import('../views/successSnapshots/SuccessSnapshotsList'));
const SuccessSnapshotsForm = lazy(() => import('../views/successSnapshots/SuccessSnapshotsForm'));

const BioList = lazy(() => import('../views/bio/BioList'));
const BioForm = lazy(() => import('../views/bio/BioForm'));

const CompanyInfoList = lazy(() => import('../views/companyInfo/CompanyInfoList'));
const CompanyInfoForm = lazy(() => import('../views/companyInfo/CompanyInfoForm'));
const CompanyLogoForm = lazy(() => import('../views/companyInfo/CompanyLogoForm'));
const CompanyCoverPhotoForm = lazy(() => import('../views/companyInfo/CompanyCoverPhotoForm'));

const TeamList = lazy(() => import('../views/team/TeamList'));
const TeamForm = lazy(() => import('../views/team/TeamForm'));
const TeamImageForm = lazy(() => import('../views/team/TeamImageForm'));

const JobPostingList = lazy(() => import('../views/jobPosting/JobPostingList'));
const JobPostingForm = lazy(() => import('../views/jobPosting/JobPostingForm'));

const WhyChooseUsList = lazy(() => import('../views/whychooseus/WhyChooseUsList'));
const WhyChooseUsForm = lazy(() => import('../views/whychooseus/WhyChooseUsForm'));

const ContentList = lazy(() => import('../views/content/ContentList'));
const ContentForm = lazy(() => import('../views/content/ContentForm'));

const SloganList = lazy(() => import('../views/slogan/SloganList'));
const SloganForm = lazy(() => import('../views/slogan/SloganForm'));
const SloganImageForm = lazy(() => import('../views/slogan/SloganImageForm'));

const ContactList = lazy(() => import('../views/contact/ContactList'));
const basePath = import.meta.env.VITE_BASE_PATH || '/';

const Router = [
  {
    path: '/',
    element: <ProtectedRoute />, // Wrap FullLayout routes with ProtectedRoute
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', exact: true, element: <Dashboard /> },
          { path: '/users', element: <UserList /> },
          { path: '/users/create', element: <UserForm /> },
          { path: '/users/edit/:id', element: <UserForm /> },
          { path: '/history', element: <HistoryList /> },
          { path: '/history/create', element: <HistoryForm /> },
          { path: '/history/edit/:id', element: <HistoryForm /> },
          { path: '/history/:id/image', element: <HistoryImageForm /> },
          { path: '/leadership', element: <LeadershipList /> },
          { path: '/leadership/create', element: <LeadershipForm /> },
          { path: '/leadership/edit/:id', element: <LeadershipForm /> },
          { path: '/mission', element: <MissionList /> },
          { path: '/mission/create', element: <MissionForm /> },
          { path: '/mission/edit/:id', element: <MissionForm /> },
          { path: '/partnership', element: <PartnershipList /> },
          { path: '/partnership/create', element: <PartnershipForm /> },
          { path: '/partnership/edit/:id', element: <PartnershipForm /> },
          { path: '/services', element: <ServicesList /> },
          { path: '/services/create', element: <ServicesForm /> },
          { path: '/services/edit/:id', element: <ServicesForm /> },
          { path: '/sliders', element: <SlidersList /> },
          { path: '/sliders/create', element: <SlidersForm /> },
          { path: '/sliders/edit/:id', element: <SlidersForm /> },
          { path: '/successSnapshots', element: <SuccessSnapshotsList /> },
          { path: '/successSnapshots/create', element: <SuccessSnapshotsForm /> },
          { path: '/successSnapshots/edit/:id', element: <SuccessSnapshotsForm /> },
          { path: '/projects', element: <ProjectsList /> },
          { path: '/projects/create', element: <ProjectsForm /> },
          { path: '/projects/edit/:id', element: <ProjectsForm /> },
          { path: '/projectCategories', element: <ProjectCategoriesList /> },
          { path: '/projectCategories/create', element: <ProjectCategoriesForm /> },
          { path: '/projectCategories/edit/:id', element: <ProjectCategoriesForm /> },
         
          { path: '/projectGoals/:projectId', element: <ProjectGoalsList /> },
          { path: '/projectGoals/create/:projectId', element: <ProjectGoalsForm /> },
          { path: '/projectGoals/edit/:id', element: <ProjectGoalsForm /> },
          { path: '/projectFinalOutcomes/:projectId', element: <ProjectFinalOutcomesList /> },
          { path: '/projectFinalOutcomes/create/:projectId', element: <ProjectFinalOutcomesForm /> },
          { path: '/projectFinalOutcomes/edit/:id', element: <ProjectFinalOutcomesForm /> },
          { path: '/projectSliders/:projectId', element: <ProjectSlidersList /> },
          { path: '/projectSliders/create/:projectId', element: <ProjectSlidersForm /> },
          { path: '/projectSliders/edit/:id', element: <ProjectSlidersForm /> },
          { path: '/bio', element: <BioList /> },
          { path: '/bio/create', element: <BioForm /> },
          { path: '/bio/edit/:id', element: <BioForm /> },
          { path: '/companyInfo', element: <CompanyInfoList /> },
          { path: '/companyInfo/create', element: <CompanyInfoForm /> },
          { path: '/companyInfo/edit/:id', element: <CompanyInfoForm /> },
          { path: '/companyInfo/:id/logo', element: <CompanyLogoForm /> },
          { path: '/companyInfo/:id/cover-photo', element: <CompanyCoverPhotoForm /> },
          { path: '/team', element: <TeamList /> },
          { path: '/team/create', element: <TeamForm /> },
          { path: '/team/edit/:id', element: <TeamForm /> },
          { path: '/team/:id/image', element: <TeamImageForm /> },
          { path: '/jobPosting', element: <JobPostingList /> },
          { path: '/jobPosting/create', element: <JobPostingForm /> },
          { path: '/jobPosting/edit/:id', element: <JobPostingForm /> },
          { path: '/contact', element: <ContactList /> },
          { path: '/whyChooseUs', element: <WhyChooseUsList /> },
          { path: '/whyChooseUs/create', element: <WhyChooseUsForm /> },
          { path: '/whyChooseUs/edit/:id', element: <WhyChooseUsForm /> },
          { path: '/content', element: <ContentList /> },
          { path: '/content/create', element: <ContentForm /> },
          { path: '/content/edit/:id', element: <ContentForm /> },
          { path: '/productCategory', element: <ProductCategoryList /> },
          { path: '/productCategory/create', element: <ProductCategoryForm /> },
          { path: '/productCategory/edit/:id', element: <ProductCategoryForm /> },
          { path: '/product', element: <ProductList /> },
          { path: '/product/create', element: <ProductForm /> },
          { path: '/product/edit/:id', element: <ProductForm /> },
          { path: '/slogan', element: <SloganList /> },
          { path: '/slogan/create', element: <SloganForm /> },
          { path: '/slogan/edit/:id', element: <SloganForm /> },
          { path: '/slogan/:id/image', element: <SloganImageForm /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router, {
  basename: basePath, // Set basename for /admin/ in production
});

export default router;