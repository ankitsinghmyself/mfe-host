declare module "dashboard/App";
declare module "profile/App";

// CSS module declarations for TypeScript
declare module "*.css" {
  const content: string;
  export default content;
}
