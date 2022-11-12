import ProjectStateButton from '@/components/Common/Buttons/Search/ProjectStateButton';
import SearchButton from '@/components/Common/Buttons/Search/SearchButton';
import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

const HeaderSearchBar = () => {
  const Container = styled.div`
    width: fit-content;
    height: 40px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${colors.gray300};
    background-color: ${colors.white};

    > form {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;

  const Input = styled.input`
    border: none;
    width: 100px;
    height: inherit;
    margin: 0 10px;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  `;

  const [isRecruiting, setRecruiting] = useState(false);
  const router = useRouter();

  const submitSearchKeyword = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchKeyword: { value: string };
    };

    const searchKeyword = target.searchKeyword.value;

    router.push({
      pathname: '/results',
      query: { keyword: searchKeyword, state: isRecruiting },
    });
  };

  return (
    <Container>
      <form onSubmit={submitSearchKeyword}>
        <SearchButton />
        <Input name="searchKeyword" />
      </form>
      <ProjectStateButton state={isRecruiting} setRecruiting={setRecruiting} />
    </Container>
  );
};

export default HeaderSearchBar;
