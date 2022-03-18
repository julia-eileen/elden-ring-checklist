import styles from './CheckboxLabel.module.scss';

const CheckboxLabel: React.FC = (props) => {
  const { children } = props;

  return (
    <label className={styles.container}>
      {children}
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckboxLabel;
