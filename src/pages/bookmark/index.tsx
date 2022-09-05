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
  const token = useAppSelector((state) => state.auth.token);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<
    fetchedData<ProjectType>
  >({ content: [], last: false });

  useEffect(() => {
    token &&
      (async () => {
        const fetchedBookmarkedProjects = await BookmarkService.getBookmarks();
        setBookmarkedProjects(fetchedBookmarkedProjects);
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && bookmarkedProjects.content.length && (
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
