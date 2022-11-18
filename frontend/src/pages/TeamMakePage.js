import React from 'react';
import UserSearch from '../components/TeamMake/UserSearch';
import styles from './TeamMakePage.module.css';

export default function TeamMakePage() {
  return (
    <div className={styles.back_gradient}>
      <UserSearch></UserSearch>
    </div>
  );
}
