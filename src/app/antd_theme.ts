import { ThemeConfig } from "antd";
import { DM_Sans } from "next/font/google";
const dmsans = DM_Sans({ subsets: ["latin"] });
const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorTextPlaceholder: "#E5E7EB",
    fontFamily: dmsans.style.fontFamily,
    colorBorder: "#505050",
    borderRadius: 8,
    colorText: "#fff",
    colorPrimary: "#81D8D0",
    colorBgBase: "#1E1E1E",
    controlOutlineWidth: 2,
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    lineWidth: 2,
  },
  components: {
    Table: {
      headerBg: "#292929",
      colorBgBase: "#1E1E1E",
    },
    Drawer: {},
  },
};

export default theme;
