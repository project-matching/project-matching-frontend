import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { BookmarkService } from 'src/services/BookmarkService';

const Bookmark = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const fetchedBookmarkedProjects = await BookmarkService.getBookmarks();
      setBookmarkedProjects(fetchedBookmarkedProjects);
    })();
  }, [token, dispatch]);

  return (
    <PrimaryLayout>
      {token && (
        <SecondaryProjectLayout
          title="즐겨찾기한 프로젝트"
          projectDtoList={bookmarkedProjects}
        />
      )}
    </PrimaryLayout>
  );
};

export default Bookmark;
