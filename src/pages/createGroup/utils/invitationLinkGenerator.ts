const invitationLinkGenerator = (code: string) => {
  return import.meta.env.VITE_BASE_URL + "invite" + "?code=" + code;
};

export default invitationLinkGenerator;
