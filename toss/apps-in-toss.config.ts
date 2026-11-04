import { defineConfig } from "@apps-in-toss/web-framework/config";

// appName은 앱인토스 콘솔에 등록한 앱 이름(영문 키)과 같아야 업로드돼요.
export default defineConfig({
  appName: "gundle-book",
  brand: {
    primaryColor: "#2F6BFF",
  },
  permissions: [
    { name: "clipboard", access: "write" },
  ],
  navigationBar: {
    withBackButton: false,
    theme: "light",
  },
  webView: {
    allowsInlineMediaPlayback: true,
    bounces: false,
    pullToRefreshEnabled: false,
    overScrollMode: "never",
    allowsBackForwardNavigationGestures: false,
  },
  webBundleDir: "dist",
});
