import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { BrowseActiveIcon, BrowseIcon, SearchIcon } from '~/components/Icon';
import MenuItem from '~/components/MenuItem';
import config from '~/config/config';
import style from './Search.module.scss';
const cx = classNames.bind(style);
function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const updateSearchURL = useCallback(
        debounce((searchItem) => {
            if (searchItem.trim() !== '') {
                navigate(config.routes.search + `?q=${searchItem}`);
            }
        }, 300),
        [],
    );
    useEffect(() => {
        updateSearchURL(query);
        return () => updateSearchURL.cancel();
    }, [updateSearchURL, query]);

    return (
        <div className={cx('search')}>
            <SearchIcon className={cx('search-icon')} />
            <input
                placeholder="Bạn muốn phát nội dung gì?"
                className={cx('input')}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                value={query}
            />
            <Tippy delay={[500, 300]} placement="bottom" content="Duyệt tìm kiếm">
                <div>
                    <MenuItem icon={<BrowseIcon />} activeIcon={<BrowseActiveIcon />} to={config.routes.search} />
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
