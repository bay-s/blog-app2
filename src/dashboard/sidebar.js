import React from 'react'
import { Link } from 'react-router-dom';


const Sidebar = () => {

    return(
        <aside class="home-sidebar dashboard-sidebar">
        <div class="menu is-menu-main">
          <ul class="menu-list">
            <li>
            <Link to='/dashboard/index' class="is-active router-link-active has-icon">
                <span class="icon"><i class="mdi mdi-desktop-mac"></i></span>
                <span class="menu-item-label">Dashboard</span>
                </Link>
            </li>
          </ul>
          <ul class="menu-list py-2">
            <li>
              <Link to='/dashboard/posts' class="has-icon">
                <span class="icon has-update-mark"><i class="mdi mdi-table"></i></span>
                <span class="menu-item-label">Posts</span>
              </Link>
            </li>
            <li>
            <Link to='/dashboard/comment/' class="has-icon">
                <span class="icon"><i class="mdi mdi-square-edit-outline"></i></span>
                <span class="menu-item-label">Comment</span>
            </Link>
            </li>
            <li>
            <Link to='/dashboard/follower/' class="has-icon">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Follower</span>
            </Link>
            </li>
            <li>
            <li>
            <Link to='/dashboard/following/' class="has-icon">
                <span class="icon"><i class="mdi mdi-square-edit-outline"></i></span>
                <span class="menu-item-label">Following</span>
            </Link>
            </li>
            <Link to='/dashboard/edit-profile/' class="has-icon">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Setting</span>
            </Link>
            </li>
            <li>
            <Link to='/dashboard/menus' class="has-icon">
            <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Bookmarked</span>
            </Link>
            </li>
          </ul>

        </div>
      </aside>
    )
}

export default Sidebar;