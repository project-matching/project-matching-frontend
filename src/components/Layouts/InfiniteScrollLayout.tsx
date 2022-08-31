import styled from '@emotion/styled';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

const LoadingDiv = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface fetchedData {
  content: any[];
  last: boolean;
}

export interface LayoutProps {
  api: (_no: number) => Promise<fetchedData>;
  items: any[];
  setItems: Dispatch<SetStateAction<any[]>>;
  children: React.ReactNode;
  title?: string;
}

const InfiniteScrollLayout = ({
  api,
  items,
  setItems,
  children,
  title = '프로젝트',
}: LayoutProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const [isLast, setIsLast] = useState(items.length ? false : true);
  const [lastItem, setLastItem] = useState<any>(
    items[items.length - 1] || null
  );

  const fetchMoreData = async () => {
    try {
      if (!lastItem || isLast) return;

      const data = await api(
        lastItem.projectNo || lastItem.userNo || lastItem.userNo
      );

      setIsLast(data.last);
      setItems([...items, ...data.content]);
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
        items && setLastItem(items[items.length - 1]);
      }
      if (isLast) {
        observer.disconnect();
      }
    });
  };

  useEffect(() => {
    if (targetRef) {
      const io = new IntersectionObserver(callback, {
        root: document,
        threshold: 0.1,
      });
      targetRef.current && io.observe(targetRef.current);
    }
  });

  // TODO: '이/가'를 정규표현식을 통해 정리

  return (
    <div>
      <div>{children}</div>
      {!isLast && lastItem ? (
        <LoadingDiv ref={targetRef}>Loading...</LoadingDiv>
      ) : lastItem ? (
        <div>마지막 페이지입니다.</div>
      ) : (
        <div>해당하는 {title}가(이) 없습니다.</div>
      )}
    </div>
  );
};

export default InfiniteScrollLayout;
