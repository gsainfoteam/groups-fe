const invitationLinkGenerator = (groupUuid: string, code: string) => {
  return (
    import.meta.env.VITE_BASE_URL +
    "invite" +
    "?groupUuid=" +
    groupUuid +
    "?code=" +
    code
  );
};

export default invitationLinkGenerator;
