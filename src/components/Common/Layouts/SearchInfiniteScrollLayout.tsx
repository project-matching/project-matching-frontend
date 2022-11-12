import { fontSize } from '@/styles/theme';
import styled from '@emotion/styled';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from 'src/redux/hooks';

const LoadingDiv = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  display: flex;
  margin: 20px 0 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${fontSize.sm};
`;

export interface fetchedData<T> {
  content: Array<T>;
  last: boolean;
}

export interface LayoutProps {
  api: (
    _content: string | null,
    _no: number | null,
    _filter?: 'EMAIL' | 'NAME'
  ) => Promise<fetchedData<any>>;
  content: string | null;
  filter?: 'EMAIL' | 'NAME';
  data: fetchedData<any>;
  setData: Dispatch<SetStateAction<fetchedData<any>>>;
  children: React.ReactNode;
  title?: string;
}

const SearchInfiniteScrollLayout = ({
  api,
  data,
  setData,
  content,
  children,
  title = '프로젝트',
  filter,
}: LayoutProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [isLast, setIsLast] = useState<boolean>(false);
  const [lastItem, setLastItem] = useState<any>(null);

  const fetchMoreData = async () => {
    try {
      if (!lastItem || isLast) return;

      const newData = await api(
        content,
        lastItem.projectNo || lastItem.notificationNo || lastItem.userNo,
        filter
      );

      setData({
        ...newData,
        content: [...data.content, ...newData.content],
      });
      setIsLast(newData.last);
      setLastItem(newData.content[newData.content.length - 1]);
    } catch (error) {
      console.error(error);
    }
  };

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !isLast) {
        await fetchMoreData();
      }
      if (isLast) {
        observer.disconnect();
      }
    });
  };

  useEffect(() => {
    let io: undefined | IntersectionObserver;

    if (targetRef) {
      io = new IntersectionObserver(callback, {
        root: document,
        threshold: 0.1,
      });
      targetRef.current && io.observe(targetRef.current);
    }
    return () => {
      if (io) {
        io.disconnect();
      }
    };
  });

  // 로그아웃/로그인 시 data 변경 (TODO: 최적화)
  useEffect(() => {
    setLastItem(data.content[data.content.length - 1]);
    setIsLast(data.last);
  }, [data, userInfo.no, isLast]);

  // TODO: '이/가'를 정규표현식을 통해 정리
  return (
    <div>
      <div>{children}</div>
      {!isLast && lastItem ? (
        <LoadingDiv ref={targetRef}>Loading...</LoadingDiv>
      ) : isLast && lastItem ? (
        <Message>마지막 페이지입니다.</Message>
      ) : (
        <Message>해당하는 {title}이(가) 없습니다.</Message>
      )}
    </div>
  );
};

export default SearchInfiniteScrollLayout;
