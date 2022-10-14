import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/reducers/components/modals';
import { BookmarkService } from 'src/services/BookmarkService';

const useBookmark = () => {
  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState(false);

  const toggleBookmark = useCallback(
    async (projectNo: number) => {
      try {
        if (bookmark === false) {
          await BookmarkService.postBookmarks(projectNo);
        } else {
          await BookmarkService.deleteBookmarks(projectNo);
        }
        setBookmark((prev) => !prev);
      } catch (error: any) {
        if (error.code !== 'ECONNABORTED') {
          dispatch(openModal('AuthModal'));
        }
      }
    },
    [bookmark, dispatch]
  );

  return { bookmark, setBookmark, toggleBookmark };
};

export default useBookmark;
