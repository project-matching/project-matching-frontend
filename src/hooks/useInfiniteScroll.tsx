import { useEffect, useState } from 'react';

interface UserType {
  email: string;
  image: string;
  name: string;
  userNo: number;
}

export interface ProjectType {
  bookMark: true;
  currentPeople: number;
  maxPeople: number;
  name: string;
  projectNo: number;
  projectSimplePositionDtoList: [
    {
      positionName: string;
      positionNo: number;
      projectNo: number;
    }
  ];
  projectSimpleTechnicalStackDtoList: [
    {
      image: string;
      projectNo: number;
      technicalStackName: string;
    }
  ];
  register: string;
  viewCount: number;
}

interface NotificationType {
  createDate: string;
  no: number;
  read: true;
  title: string;
  type: string;
}

interface fetchedData {
  data: {
    data: {
      content: UserType[] | ProjectType[] | NotificationType[];
      last: boolean;
    };
  };
}

interface PropTypes {
  api: (_no: number) => Promise<fetchedData>;
}

const useInfiniteScroll = ({ api }: PropTypes) => {
  const [root, setRoot] = useState(null);
  const [isLast, setIsLast] = useState(false);
  const [items, setItems] = useState<
    UserType[] | ProjectType[] | NotificationType[] | null
  >(null);
  const [lastItem, setLastItem] = useState<
    UserType | ProjectType | NotificationType | null
  >(null);

  const fetchMoreData = async () => {
    try {
      if (!lastItem) return;

      const response = await api(
        lastItem.projectNo || lastItem.no || lastItem.userNo
      );
      const data = response?.data.data;
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
        setLastItem(items[items.length - 1]);
        observer.observe(lastItem);
      }
    });
  };

  useEffect(() => {
    if (root) {
      const io = new IntersectionObserver(callback, {
        root,
        threshold: 0.25,
      });
      io.observe(lastItem);
    }
  }, [root]);

  return { items, setItems, setRoot };
};

export default useInfiniteScroll;
