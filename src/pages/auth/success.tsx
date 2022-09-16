import { useEffect } from 'react';

const Success = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');
    const access_exp = searchParams.get('access_exp');

    if (access && refresh && access_exp) {
      window.opener.parentCallback({ access, refresh, access_exp });
    }
    window.close();
  });

  return <div>OAuth login</div>;
};

export default Success;
