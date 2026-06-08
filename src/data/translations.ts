/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    vi: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand details
  brandName: { en: 'POTTERY.VN', vi: 'POTTERY.VN' },
  companyName: { en: 'Vietnam Pottery Join Stock Company', vi: 'Công ty Cổ phần Gốm Sứ Việt Nam' },
  brandSlogan: { en: 'Vietnamese Ceramics for Global Spaces', vi: 'Gốm Việt cho Cảnh quan & Không gian Sống Toàn cầu' },
  salesEmail: { en: 'sales@pottery.vn', vi: 'sales@pottery.vn' },
  
  // Choose customer type modal & choices
  customerSelectionTitle: { en: 'Welcome to POTTERY.VN', vi: 'Chào mừng bạn đến với POTTERY.VN' },
  customerSelectionSubtitle: { en: 'How would you like to explore our Vietnamese ceramic collections today?', vi: 'Hãy lựa chọn phương thức trải nghiệm và tìm kiếm sản phẩm gốm sứ phù hợp với bạn:' },
  retailButton: { en: 'Shop Retail Collection', vi: 'Mua sắm Cá nhân (Bán lẻ)' },
  retailDesc: { en: 'Discover premium planters, vases, and decorative pieces curated for your home, garden, and terraces.', vi: 'Khám phá chậu cây, bình hoa nghệ thuật, và đôn gốm cao cấp cho ngôi nhà, sân vườn và ban công của bạn.' },
  tradeButton: { en: 'Enter Trade Portal', vi: 'Cổng thông tin Kinh doanh (B2B)' },
  tradeDesc: { en: 'Explore Vietnamese pottery collections for wholesale sourcing, distribution pools, hotels & resorts, and private label development.', vi: 'Giải pháp cung ứng gốm xuất khẩu cho nhà bán sỉ, đại lý phân phối, dự án nghỉ dưỡng và phát triển nhãn hàng riêng.' },
  browseButton: { en: 'Continue Browsing', vi: 'Xem nhanh Website' },
  browseDesc: { en: 'Explore our design inspirations and product catalog before selecting your custom pathway.', vi: 'Xem các bộ sưu tập mẫu trước khi cấu hình luồng thông tin cụ thể.' },

  // Role simulator labels
  simTitle: { en: 'POTTERY.VN Role Simulator', vi: 'Bản mô phỏng Đóng vai Trải nghiệm' },
  simSubtitle: { en: 'Choose a profile below to instantly test different screens, access controls, and price policies.', vi: 'Chọn một vai trò dưới đây để kiểm tra ngay lập tức các giao diện, kiểm soát quyền truy cập và chính sách giá.' },
  simRoleGuest: { en: 'Guest Visitor', vi: 'Khách vãng lai' },
  simRoleRetail: { en: 'Retail Customer', vi: 'Khách mua lẻ' },
  simRoleApplicant: { en: 'Trade Applicant', vi: 'Hồ sơ Chờ duyệt B2B' },
  simRoleApproved: { en: 'Approved B2B Buyer', vi: 'Buyer B2B Đã phê duyệt' },
  simRoleAdmin: { en: 'Advanced Store Admin', vi: 'Quản trị viên Hệ thống' },
  simCurrentState: { en: 'Current Mode', vi: 'Chế độ hiện tại' },
  
  // Navigation links
  navProducts: { en: 'Products', vi: 'Sản phẩm' },
  navCollections: { en: 'Collections', vi: 'Bộ sưu tập' },
  navShop: { en: 'Shop', vi: 'Cửa hàng lẻ' },
  navForTradeBuyers: { en: 'For Trade Buyers', vi: 'Đối tác B2B' },
  navExportCapabilities: { en: 'Export Capabilities', vi: 'Năng lực Xuất khẩu' },
  navCustomDevelopment: { en: 'Custom Development', vi: 'Phát triển Sản phẩm' },
  navInspiration: { en: 'Inspiration', vi: 'Ý tưởng & Không gian' },
  navAboutUs: { en: 'About Us', vi: 'Về chúng tôi' },
  navContact: { en: 'Contact', vi: 'Liên hệ' },
  navTradeCatalogue: { en: 'Trade Catalogue', vi: 'Catalogue B2B' },

  // Interactive buttons and badges
  signIn: { en: 'Sign In', vi: 'Đăng nhập' },
  register: { en: 'Register', vi: 'Đăng ký' },
  signOut: { en: 'Sign Out', vi: 'Đăng xuất' },
  myAccount: { en: 'My Account', vi: 'Tài khoản' },
  downloadCatalogue: { en: 'Download Catalogue', vi: 'Tải Catalogue' },
  requestFobQuote: { en: 'Request FOB Quote', vi: 'Yêu cầu Báo giá FOB' },
  applyTradeAccountShort: { en: 'Apply for Trade', vi: 'Đăng ký B2B' },
  applyTradeAccount: { en: 'Apply for Trade Account', vi: 'Đăng ký Tài khoản Doanh nghiệp' },
  inquiryList: { en: 'Inquiry List', vi: 'Danh mục Yêu cầu' },
  addToInquiry: { en: 'Add to Inquiry', vi: 'Thêm vào yêu cầu' },
  viewDetails: { en: 'View Details', vi: 'Xem chi tiết' },
  saveProduct: { en: 'Save Product', vi: 'Lưu sản phẩm' },
  searchPlaceholder: { en: 'Search catalog by SKU, name or finish name...', vi: 'Tìm kiếm theo SKU, tên sản phẩm hoặc chất men...' },
  enquireNow: { en: 'Enquire Now', vi: 'Gửi yêu cầu' },
  addToCart: { en: 'Add to Cart', vi: 'Thêm vào giỏ' },
  enquiryOnly: { en: 'Availability upon enquiry', vi: 'Sẵn sàng phục vụ theo yêu cầu' },
  availabilityInStock: { en: 'In Stock', vi: 'Còn hàng' },
  availabilityMadeToOrder: { en: 'Made to Order', vi: 'Đặt sản xuất' },
  availabilityUponEnquiry: { en: 'Upon Enquiry', vi: 'Liên hệ' },

  // B2B Pricing Locking terms
  pricingFobTitle: { en: 'FOB Trade Pricing', vi: 'Chính sách giá sỉ FOB' },
  pricingLockedGuest: { en: 'Available for approved business buyers.', vi: 'Cung cấp sau khi phê duyệt tài khoản doanh nghiệp.' },
  pricingLockedGuestDesc: { en: 'Apply for a Trade Account to access FOB pricing, minimum order quantities, specification sheets and export quotation support.', vi: 'Vui lòng đăng ký Tài khoản đối tác để xem bảng giá FOB, số lượng đặt hàng tối thiểu MOQ, tài liệu kỹ thuật và nhận hỗ trợ báo giá xuất khẩu chính thức.' },
  pricingLockedApplicant: { en: 'Your trade account application is under review.', vi: 'Hồ sơ doanh nghiệp của bạn đang được xét duyệt.' },
  pricingLockedApplicantDesc: { en: 'FOB pricing and trade information will become available after account approval.', vi: 'Bảng giá FOB và biểu thông tin đóng gói container sẽ tự động hiển thị sau khi quản trị viên phê duyệt hồ sơ của bạn.' },
  pricingApprovedHeader: { en: 'FOB Vietnam Port, Incoterms® 2020', vi: 'Cảng bốc hàng Việt Nam, Incoterms® 2020' },
  pricingApprovedPortNote: { en: 'Port details will be confirmed in final quotation.', vi: 'Cảng bốc hàng cụ thể sẽ được xác nhận trong báo giá chính thức.' },
  moqLabel: { en: 'MOQ (Minimum Order Qty)', vi: 'Số lượng tối thiểu (MOQ)' },

  // Categories translation
  catPlanters: { en: 'Outdoor Planters', vi: 'Chậu cây Ngoài trời' },
  catIndoorPots: { en: 'Indoor Pots', vi: 'Chậu gốm Trong nhà' },
  catVases: { en: 'Decorative Vases', vi: 'Bình hoa Trang trí' },
  catStools: { en: 'Ceramic Stools', vi: 'Đôn gốm Nghệ thuật' },
  catObjects: { en: 'Decorative Objects', vi: 'Vật phẩm Mỹ nghệ' },
  catLargeGarden: { en: 'Large Garden Pieces', vi: 'Gốm Sân vườn Cỡ lớn' },

  // Customer selections in form
  importer: { en: 'Importer', vi: 'Nhà nhập khẩu' },
  distributor: { en: 'Distributor', vi: 'Nhà phân phối' },
  wholesaler: { en: 'Wholesaler', vi: 'Nhà bán sỉ' },
  gardenCentre: { en: 'Garden Centre', vi: 'Trung tâm sân vườn' },
  decorRetailer: { en: 'Home Décor Retailer', vi: 'Cửa hàng trang trí nội thất' },
  hospitalityBuyer: { en: 'Hospitality Procurement', vi: 'Thu mua Khách sạn/Resort' },
  sourcingCompany: { en: 'Sourcing Company', vi: 'Đơn vị ủy thác thu mua' },
  privateLabel: { en: 'Private Label Partner', vi: 'Đối tác Gia công (OEM/ODM)' },
  personalBuyer: { en: 'Personal Buyer', vi: 'Khách hàng cá nhân' },

  // Home Page sections headings
  heroHeadline: { en: 'Vietnamese Pottery Crafted for Global Spaces.', vi: 'Gốm Sứ Việt Nam Kiến Tạo Không Gian Sống Toàn Cầu.' },
  heroSubheadline: { en: 'Outdoor planters, decorative vessels, ceramic stools, and custom pottery collections for homes, retailers, importers, and hospitality projects worldwide.', vi: 'Chậu cây ngoài trời, bình gốm nghệ thuật, đôn trang trí và các thiết kế gốm độc bản phục vụ nhà ở, hệ thống bán lẻ và nhà nhập khẩu toàn cầu.' },
  trustStrip: { en: 'Indoor Living • Outdoor Landscape • Retail Collections • B2B Export Supply', vi: 'Nội thất • Cảnh quan Ngoài trời • Cửa hàng Bán lẻ • Cung ứng Xuất khẩu (FOB)' },
  pathSectionTitle: { en: 'Designed for Living. Prepared for Trade.', vi: 'Vẹn toàn Thẩm mỹ. Tuyệt hảo cho Giao thương.' },
  personalCardTitle: { en: 'Personal Collection', vi: 'Khám phá Tiêu dùng' },
  personalCardDesc: { en: 'Discover ceramic planters, vases, and decorative pieces for your home, garden, and outdoor living spaces.', vi: 'Tìm kiếm những tác phẩm gốm mộc mạc, tinh xảo phục vụ trang trí nội thất gia đình, ban công hoặc cảnh quan biệt thự.' },
  tradeCardTitle: { en: 'Trade & Export Buyers', vi: 'Hợp tác Doanh nghiệp' },
  tradeCardDesc: { en: 'Explore product selections for wholesale, distribution, hospitality, sourcing, and custom pottery development.', vi: 'Truy cập cổng thông tin xuất khẩu, catalogue thương mại, đàm phán MOQ và phát triển khuôn mẫu độc quyền.' },
  explorePotteryRange: { en: 'Explore Our Pottery Range', vi: 'Danh mục Sản phẩm Gốm sứ' },
  brandIntroTitle: { en: 'Crafted in Vietnam. Shaped for Contemporary Spaces.', vi: 'Chế tác tại Việt Nam. Định hình cho Không gian Hiện đại.' },
  brandValue1: { en: 'Natural Materials', vi: 'Nguyên liệu Tự nhiên' },
  brandValue2: { en: 'Refined Craftsmanship', vi: 'Đôi tay Nghệ nhân' },
  brandValue3: { en: 'Flexible Product Selection', vi: 'Cơ cấu Sản phẩm Linh hoạt' },
  brandIntroBody: {
    en: 'POTTERY.VN presents Vietnamese ceramic collections designed for indoor living, outdoor landscapes, retail assortments and international sourcing. Our focus is on expressive forms, natural textures and pottery selections suited to both personal spaces and professional buyer requirements.',
    vi: 'POTTERY.VN là cổng kết nối tinh hoa gốm sứ Việt Nam với thế giới. Chúng tôi mang tới các sản phẩm gốm mộc mạc, chất men bền bỉ với thời gian, kiểu dáng tinh gọn hiện đại phù hợp cho cả nhu cầu trang trí chất lượng cao trong tinh thần kiến trúc hiện đại và tiêu chuẩn xuất khẩu quốc tế khắt khe.'
  },
  shopCollectionHeading: { en: 'Curated Pottery for Indoor and Outdoor Living', vi: 'Sự hoàn quyện giữa gốm Việt và Nhịp sống Đương đại' },
  shopCollectionDesc: { en: 'Explore pottery pieces selected for homes, gardens, balconies, terraces and expressive interiors.', vi: 'Lựa chọn các sản phẩm gốm mọc trứ danh được chế tác và nung ở nhiệt độ cao, chống chịu mọi điều kiện thời tiết khắc nghiệt.' }
};

export function getTranslation(key: string, lang: 'en' | 'vi'): string {
  if (TRANSLATIONS[key]) {
    return TRANSLATIONS[key][lang];
  }
  return key;
}
