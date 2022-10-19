import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { BookmarkService } from 'src/services/BookmarkService';
import { ProjectType } from 'src/services/ProjectService';

const Bookmark = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [bookmarkedProjects, setBookmarkedProjects] = useState<
    fetchedData<ProjectType>
  >({ content: [], last: false });

  useEffect(() => {
    BookmarkService.getBookmarks()
      .then((bookmarked) => setBookmarkedProjects(bookmarked))
      .catch((_error) => {
        dispatch(openModal('AuthModal'));
      });
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && bookmarkedProjects.content.length && (
        <InfiniteScrollLayout
          api={BookmarkService.getBookmarks}
          data={bookmarkedProjects}
          setData={setBookmarkedProjects}
        >
          <SecondaryProjectLayout
            title="즐겨찾기한 프로젝트"
            projectDtoList={bookmarkedProjects.content}
            bookmarkOnly={true}
          />
        </InfiniteScrollLayout>
      )}
    </PrimaryLayout>
  );
};

export default Bookmark;
