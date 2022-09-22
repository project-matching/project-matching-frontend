import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import BookmarkProjectLayout from '@/components/Projects/BookmarkProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { BookmarkService } from 'src/services/BookmarkService';
import { ProjectType } from 'src/services/ProjectService';

const Bookmark = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<
    fetchedData<ProjectType>
  >({ content: [], last: false });

  useEffect(() => {
    try {
      userInfo.no &&
        (async () => {
          const fetchedBookmarkedProjects =
            await BookmarkService.getBookmarks();
          setBookmarkedProjects(fetchedBookmarkedProjects);
        })();
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
      // TODO: 로그인을 해주세요.
    }
  }, [userInfo.no]);

  return (
    <PrimaryLayout>
      {userInfo.no && bookmarkedProjects.content.length && (
        <InfiniteScrollLayout
          api={BookmarkService.getBookmarks}
          data={bookmarkedProjects}
          setData={setBookmarkedProjects}
        >
          <BookmarkProjectLayout
            title="즐겨찾기한 프로젝트"
            projectDtoList={bookmarkedProjects.content}
          />
        </InfiniteScrollLayout>
      )}
    </PrimaryLayout>
  );
};

export default Bookmark;
