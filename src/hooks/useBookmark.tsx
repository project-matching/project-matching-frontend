import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/reducers/components/modals';
import { BookmarkService } from 'src/services/BookmarkService';

/**
 * TODO:
 * 1. 북마크 입력 시 상태 변경
 * 2. 에러 처리 -> 토큰 없을 경우 로그인 유도
 */

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
        setBookmark(!bookmark);
      } catch (error) {
        // 에러 처리
        console.error(error);
        dispatch(openModal('AuthModal'));
      }
    },
    [bookmark, dispatch]
  );

  return { bookmark, setBookmark, toggleBookmark };
};

export default useBookmark;
