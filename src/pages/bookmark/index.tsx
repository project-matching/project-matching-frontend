import BookmarkProjectLayout from '@/components/Projects/BookmarkProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { BookmarkService } from 'src/services/BookmarkService';

// TODO: 무한스크롤

const Bookmark = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedBookmarkedProjects = await BookmarkService.getBookmarks();
      setBookmarkedProjects(fetchedBookmarkedProjects);
    })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
        <BookmarkProjectLayout
          title="즐겨찾기한 프로젝트"
          projectDtoList={bookmarkedProjects}
        />
      )}
    </PrimaryLayout>
  );
};

export default Bookmark;
