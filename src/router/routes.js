import Home from 'views/Home.vue'
// auth
import Login from 'views/auth/Login.vue'
import Register from 'views/auth/Register.vue'
// product sales
import ProductSales from 'views/sales/Index.vue'
import ProductSalesCreate from 'views/sales/Create.vue'
import ProductSalesEdit from 'views/sales/Edit.vue'
// product categories
import ProductCategories from 'views/ProductCategories/Index.vue'
import ProductCategoriesCreate from 'views/ProductCategories/Create.vue'
import ProductCategoriesEdit from 'views/ProductCategories/Edit.vue'
// products
import Products from 'views/products/Index.vue'
import ProductsCreate from 'views/products/Create.vue'
import ProductsEdit from 'views/products/Edit.vue'
// stock categories
import StockCategories from 'views/StockCategories/Index.vue'
import StockCategoriesCreate from 'views/StockCategories/Create.vue'
import StockCategoriesEdit from 'views/StockCategories/Edit.vue'
// stocks
import Stocks from 'views/stocks/Index.vue'
import StocksCreate from 'views/stocks/Create.vue'
import StocksEdit from 'views/stocks/Edit.vue'
//suppliers
import Suppliers from 'views/suppliers/Index.vue'
import SuppliersCreate from 'views/suppliers/Create.vue'
import SuppliersEdit from 'views/suppliers/Edit.vue'
//customers
import Customers from 'views/customers/Index.vue'
import CustomersCreate from 'views/customers/Create.vue'
import CustomersEdit from 'views/customers/Edit.vue'
// users
import Users from 'views/users/Index.vue'
import UsersCreate from 'views/users/Create.vue'
import UsersEdit from 'views/users/Edit.vue'
// mydetails
import MyDetails from 'views/mydetails/Index.vue'
// companies
import Companies from 'views/companies/Index.vue'
import CompaniesCreate from 'views/companies/Create.vue'
import CompaniesEdit from 'views/companies/Edit.vue'
// settings
import Settings from 'views/settings/Index.vue' 
// measurement units
import Units from 'views/units/Index.vue'
import UnitsCreate from 'views/units/Create.vue'
import UnitsEdit from 'views/units/Edit.vue'
// taxes
import Taxes from 'views/taxes/Index.vue'
import TaxesCreate from 'views/taxes/Create.vue'
import TaxesEdit from 'views/taxes/Edit.vue'
// discounts
import Discounts from 'views/discounts/Index.vue'
import DiscountsCreate from 'views/discounts/Create.vue'
import DiscountsEdit from 'views/discounts/Edit.vue'
// user roles
import Roles from 'views/roles/Index.vue'
import RolesCreate from 'views/roles/Create.vue'
import RolesEdit from 'views/roles/Edit.vue'
// roles permission
import Permissions from '../views/permissions/Index.vue'
import PermissionsCreate from '../views/permissions/Create.vue'
import PermissionsEdit from '../views/permissions/Edit.vue'
// modules
import Modules from '../views/modules/Index.vue'
import ModulesCreate from '../views/modules/Create.vue'
import ModulesEdit from '../views/modules/Edit.vue'
// assign permissions to roles
import AssignPermissions from '../views/roles/assign-permissions/Index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Home },
  // auth
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // product sales
  { path: '/sales', component: ProductSales },
  { path: '/sales/create', component: ProductSalesCreate },
  { path: '/sales/:sale_id/edit', component: ProductSalesEdit },
  // product categories
  { path: '/product-categories', component: ProductCategories },
  { path: '/product-categories/create', component: ProductCategoriesCreate },
  { path: '/product-categories/:product_category_id/edit', component: ProductCategoriesEdit },
  // product categories
  { path: '/products', component: Products },
  { path: '/products/create', component: ProductsCreate },
  { path: '/products/:product_id/edit', component: ProductsEdit },
  // stock categories
  { path: '/stock-categories', component: StockCategories },
  { path: '/stock-categories/create', component: StockCategoriesCreate },
  { path: '/stock-categories/:stock_category_id/edit', component: StockCategoriesEdit },
  // stocks
  { path: '/stocks', component: Stocks },
  { path: '/stocks/create', component: StocksCreate },
  { path: '/stocks/:stock_id/edit', component: StocksEdit },
  // suppliers
  { path: '/suppliers', component: Suppliers },
  { path: '/suppliers/create', component: SuppliersCreate },
  { path: '/suppliers/:supplier_id/edit', component: SuppliersEdit },
  // customers
  { path: '/customers', component: Customers },
  { path: '/customers/create', component: CustomersCreate },
  { path: '/customers/:customer_id/edit', component: CustomersEdit },
  // Companies
  { path: '/companies', component: Companies },
  { path: '/companies/create', component: CompaniesCreate },
  { path: '/companies/:company_id/edit', component: CompaniesEdit },
  // mydetails
  { path: '/mydetails', component: MyDetails },
  // users
  { path: '/users', component: Users },
  { path: '/users/create', component: UsersCreate },
  { path: '/users/:user_id/edit', component: UsersEdit },
  // settings
  { path: '/settings', component: Settings }, 
  // measurement units
  { path: '/units', component: Units },
  { path: '/units/create', component: UnitsCreate },
  { path: '/units/:unit_id/edit', component: UnitsEdit },
  // taxes
  { path: '/taxes', component: Taxes },
  { path: '/taxes/create', component: TaxesCreate },
  { path: '/taxes/:tax_id/edit', component: TaxesEdit },
  // discounts
  { path: '/discounts', component: Discounts },
  { path: '/discounts/create', component: DiscountsCreate },
  { path: '/discounts/:discount_id/edit', component: DiscountsEdit },
  // role permissions
  { path: '/permissions', component: Permissions },
  { path: '/permissions/create', component: PermissionsCreate },
  { path: '/permissions/:permission_id/edit', component: PermissionsEdit },
  // user roles
  { path: '/roles', component: Roles },
  { path: '/roles/create', component: RolesCreate },
  { path: '/roles/:role_id/edit', component: RolesEdit },
  // modules
  { path: '/modules', component: Modules },
  { path: '/modules/create', component: ModulesCreate },
  { path: '/modules/:module_id/edit', component: ModulesEdit },
  // assign permissions to roles
  { path: '/roles/assign-permissions', component: AssignPermissions },
];

export default routes;