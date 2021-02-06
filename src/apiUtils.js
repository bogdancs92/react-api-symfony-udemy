export const parseApiError = (error) => {
  console.log("error api", error);
  return error.response.body.violations.reduce((parsedErrors, violation) => {
    parsedErrors[violation["propertyPath"]] = violation["message"];
    return parsedErrors;
  }, {});
};

export const hydraPageCount = (collection) => {
  console.log("collection", collection["hydra:view"]["hydra:last"]);
  if (!collection["hydra:view"]) {
    return 1;
  }
  return Number(collection["hydra:view"]["hydra:last"].match(/_page=(\d+)/)[1]);
};

const CAN_WRITE_BLOG_POST = ["ROLE_MEMBER", "ROLE_ADMON", "ROLE_SUPERADMIN"];
export const canWriteBlogPost = (userData) => {
  return (
    userData !== null &&
    userData.roles.some((userRole) => {
      return CAN_WRITE_BLOG_POST.includes(userRole);
    })
  );
};
