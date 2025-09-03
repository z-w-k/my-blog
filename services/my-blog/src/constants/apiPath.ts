// API路径常量
const API_PATHS = {
  // 认证相关
  AUTH: {
    BASE: '/api/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET: '/reset'
  },

  // 用户相关
  USERS: {
    BASE: '/api/users',
    ALL: '/',
    BY_ID: '/:id',
    ME: '/me'
  },
  PUBLIC: {
    BASE: '/public',
  }
};

// 需要排除JWT验证的路由
const PUBLIC_PATHS = [
  `${API_PATHS.AUTH.BASE}${API_PATHS.AUTH.LOGIN}`,
  `${API_PATHS.AUTH.BASE}${API_PATHS.AUTH.REGISTER}`,
  `${API_PATHS.PUBLIC.BASE}`
];

export {
  API_PATHS,
  PUBLIC_PATHS
};