const invitationLinkGenerator = (code: string,groupId:string) => {
  return `${import.meta.env.VITE_BASE_URL}invite/${code}/${groupId}`;
};

export default invitationLinkGenerator;
