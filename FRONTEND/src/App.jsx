import React, { use } from 'react'
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Blog from './components/blog.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Contact from './pages/Contact.jsx';
import AdminDashboard from './pages/Dashboard.jsx';
import DashboardRouter from './pages/DashboardRouter';
import VendorDashboard from './vendor-dashboard/VendorDashboardLayout.jsx';
import VendorOrders from "./vendor-dashboard/VendorOrders";
import VendorChats from "./vendor-dashboard/VendorChats";
import VendorReviews from "./vendor-dashboard/VendorReviews";
import VendorNotifications from "./vendor-dashboard/VendorNotifications";
import VendorProfile from "./vendor-dashboard/VendorProfile";
import UserDashboard from './user-dashboard/UserDashboard.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AboutUs from './pages/About-Us.jsx';
import OurServices from './pages/Our-Services.jsx';
import MachiningPage from './pages/Machining.jsx';
import LaserCutting from './pages/Laser-Cutting.jsx';
import FabricationPage from './pages/Fabrication.jsx';
import PrintingPage from './pages/3D-Printing.jsx';
import CastingPage from './pages/Casting.jsx';
import GearManufacturingPage from './pages/Gear-Manufacturing.jsx';
import WireCuttingPage from './pages/Wire-Cutting.jsx';
import BendingPage from './pages/Bending.jsx';
import Defence from './pages/defence.jsx';
import AgriTechHeader from './pages/AgriTechHeader.jsx';
import Epc from './pages/Epc.jsx';
import Machine from './pages/Machine.jsx';
import Printing from './pages/Printing.jsx';
import SheetMetal from './pages/sheetmetal.jsx';
import UrethaneCastingService from './pages/UrethaneCastingService.jsx';
import Home from './home/Home.jsx';
import UpdateBlog from './dashboard/Updateblog.jsx'
import UpdatePost from './dashboard/UpdatePost.jsx'
import UpdateReview from './dashboard/UpdateReview.jsx'
import CreateBlog from './dashboard/createblog.jsx';
import CreatePost from './dashboard/createPost.jsx';
import CreateReview from './dashboard/createTestimonials.jsx';
import Myblogs from './dashboard/myblogs.jsx';
import AllPosts from './dashboard/All-Posts.jsx';
import AllTestimonials from './dashboard/All-Testimonials.jsx'
import BlogDetails from './components/BlogDetails.jsx';
import MediaDetails from './components/MediaDetails.jsx';
import GetQuote from './pages/GetQuote.jsx'
import MediaGallery from './pages/MediaGallery.jsx'
import Aerospace from './pages/aerospace.jsx'
import Biofuel from './pages/biofuel.jsx'
import SolarBattery from './pages/SolarBattery.jsx'
import SolarBatteryLearnMore from './pages/SolarBatteryLearnMore.jsx'
import Collab from './pages/Collab.jsx';
import Castingservices from './pages/Castingservices.jsx';
import GearManufacturing from './pages/GearManufacturing.jsx';
import BendingServices from './pages/BendingServices.jsx';
import WireCuttingServices from './pages/WireCuttingServices.jsx';
import FabricationServices from './pages/FabricationServices.jsx';
import LaserCuttingServices from './pages/LaserCuttingServices.jsx';
import AerospaceLearnMore from './pages/AerospaceLearnMore.jsx';
import CncMillingLearnMore from './pages/CncMillingLearnMore.jsx';
import CncTurningLearnMore from './pages/CncTurningLearnMore.jsx';
import RapidPrototypingLearnMore from './pages/RapidPrototypingLearnMore.jsx';
import MetalMachiningLearnMore from './pages/MetalMachiningLearnMore.jsx';
import PlasticMachiningLearnMore from './pages/PlasticMachiningLearnMore.jsx';
import RapidVsTraditional from './pages/RapidVsTraditional.jsx';
import PrecisionMachinedParts from './pages/PrecisionMachinedParts.jsx';
import DesignTipsReduceLeadTime from './pages/DesignTipsReduceLeadTime.jsx';
import LoginSuccess from '@/pages/LoginSuccess.jsx';
import PreRegister from "./pages/PreRegister";
import VerifyOtp from './components/VerifyOtp.jsx';
import FDMPage from './pages/FDMPage.jsx'
import SLAPage from './pages/SLAPage.jsx'
import SLSPage from './pages/SLSPage.jsx'
import MLSAPage from './pages/MLSAPage.jsx'
import DMLSPage from './pages/DMLSPage.jsx'
import Epcrole from './pages/Epcrole.jsx'
import Epcabout from './pages/Epcabout.jsx'
import MyProfile from "./user-dashboard/MyProfile.jsx";
import AdminOrders from "@/admin-dashboard/AdminOrders.jsx";
import AdminOrderDetail from "@/admin-dashboard/AdminOrderDetail.jsx";
import AdminUsers from "@/admin-dashboard/AdminUsers.jsx";
import AdminChats from "./admin-dashboard/AdminChats.jsx";
import AdminCancelRequests from "./admin-dashboard/AdminCancelRequests.jsx";
import AdminOrderReviews from './admin-dashboard/AdminOrderReviews.jsx';
import RoleProtectedRoute from './components/RoleProtectedRoute.jsx';
function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/admin-dashboard", "/login", "/register", "/my-blogs", "/create-blog", "/all-testimonials", "/create-post", "/create-review-post", "/all-posts", "/vendor-dashboard", "/user-dashboard", "/verify-otp"].includes(location.pathname);

  return (
    <div >
      {!hideNavbarFooter && (<>
        {/* <HeaderSection /> */}
        <Navbar />
      </>)}
      {/* Defining routes */}
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/our-services" element={<OurServices />} />
        <Route exact path="/machining" element={<MachiningPage />} />
        <Route exact path="/laser-cutting" element={<LaserCutting />} />
        <Route exact path="/fabrication" element={<FabricationPage />} />
        <Route exact path="/3d-printing" element={<PrintingPage />} />
        <Route exact path="/casting" element={<CastingPage />} />
        <Route exact path="/gear" element={<GearManufacturingPage />} />
        <Route exact path="/bending" element={<BendingPage />} />
        <Route exact path="/cutting" element={<WireCuttingPage />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/epc" element={<Epc />} />
        <Route exact path="/defence" element={<Defence />} />
        <Route exact path="/agri-tech" element={<AgriTechHeader />} />
        <Route exact path="/machine" element={<Machine />} />
        <Route exact path="/printing" element={<Printing />} />
        <Route exact path="/sheet-metal" element={<SheetMetal />} />
        <Route exact path="/urethrane-casting" element={<UrethaneCastingService />} />
        <Route exact path="/contact-us" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/media/:id" element={<MediaDetails />} />
        <Route path="/media-gallery" element={<MediaGallery />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/pre-register" element={<PreRegister />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ================= DASHBOARD ROUTER ================= */}
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "user", "vendor"]}>
              <DashboardRouter />
            </RoleProtectedRoute>
          }
        />

        {/* ================= ADMIN ONLY ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manage-orders"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminOrderDetail />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manage-chats"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminChats />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manage-cancellations"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminCancelRequests />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminOrderReviews />
            </RoleProtectedRoute>
          }
        />

        {/* ===== ADMIN CMS ===== */}
        <Route
          path="/my-blogs"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Myblogs />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/all-posts"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllPosts />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/all-testimonials"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AllTestimonials />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CreateBlog />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CreatePost />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/create-review-post"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CreateReview />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/update-blog/:id"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <UpdateBlog />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <UpdatePost />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/update-review/:id"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <UpdateReview />
            </RoleProtectedRoute>
          }
        />

        {/* ================= USER ONLY ================= */}
        <Route
          path="/user-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <MyProfile />
            </RoleProtectedRoute>
          }
        />

        {/* ================= VENDOR ONLY ================= */}
        <Route
          path="/vendor-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard/orders"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorOrders />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard/chats"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorChats />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard/reviews"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorReviews />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard/notifications"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorNotifications />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard/profile"
          element={
            <RoleProtectedRoute allowedRoles={["vendor"]}>
              <VendorProfile />
            </RoleProtectedRoute>
          }
        />

        {/* ================= REMAINING PUBLIC SERVICE PAGES ================= */}
        <Route path="/aerospace" element={<Aerospace />} />
        <Route path="/biofuel" element={<Biofuel />} />
        <Route path="/SolarBattery" element={<SolarBattery />} />
        <Route path="/SolarBatteryLearnMore" element={<SolarBatteryLearnMore />} />
        <Route path="/Collab" element={<Collab />} />
        <Route path="/Castingservices" element={<Castingservices />} />
        <Route path="/GearManufacturing" element={<GearManufacturing />} />
        <Route path="/BendingServices" element={<BendingServices />} />
        <Route path="/WireCuttingServices" element={<WireCuttingServices />} />
        <Route path="/FabricationServices" element={<FabricationServices />} />
        <Route path="/LaserCuttingServices" element={<LaserCuttingServices />} />
        <Route path="/AerospaceLearnMore" element={<AerospaceLearnMore />} />
        <Route path="/CncMillingLearnMore" element={<CncMillingLearnMore />} />
        <Route path="/CncTurningLearnMore" element={<CncTurningLearnMore />} />
        <Route path="/RapidPrototypingLearnMore" element={<RapidPrototypingLearnMore />} />
        <Route path="/MetalMachiningLearnMore" element={<MetalMachiningLearnMore />} />
        <Route path="/PlasticMachiningLearnMore" element={<PlasticMachiningLearnMore />} />
        <Route path="/RapidVsTraditional" element={<RapidVsTraditional />} />
        <Route path="/PrecisionMachinedParts" element={<PrecisionMachinedParts />} />
        <Route path="/DesignTipsReduceLeadTime" element={<DesignTipsReduceLeadTime />} />
        <Route path="/FDMPage" element={<FDMPage />} />
        <Route path="/SLAPage" element={<SLAPage />} />
        <Route path="/SLSPage" element={<SLSPage />} />
        <Route path="/MLSAPage" element={<MLSAPage />} />
        <Route path="/DMLSPage" element={<DMLSPage />} />
        <Route path="/Epcrole" element={<Epcrole />} />
        <Route path="/Epcabout" element={<Epcabout />} />
      </Routes>

      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App