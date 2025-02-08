import withTM from 'next-transpile-modules';

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
    return config;
  },
};

const config = withTM([
  'antd',
  'rc-picker',
  'rc-util',
  'rc-input',
  'rc-tree',
  'rc-table',
  '@ant-design/icons',
  'rc-pagination',
  'rc-notification',
  'dayjs',
])(nextConfig);

export default config;
