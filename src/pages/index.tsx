import type { GetStaticPropsContext, NextPage } from 'next';
import { promises as fs } from 'fs';
import { useChecklist } from '../hooks/useChecklist';
import path from 'path';
import { IQuest } from '../types/IQuest';

import Head from 'next/head';
import Quest from '../components/Quest';

import styles from '../styles/Home.module.scss';

interface HomeProps {
  quests: IQuest[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { quests } = props;
  const { checklist, onChangeHandler } = useChecklist(quests);

  return (
    <div className={styles.container}>
      <Head>
        <title>Elden Ring Checklist</title>
        <meta name='description' content='Rise tarnished' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {quests.map((quest, questIndex) => {
          return (
            <Quest
              key={quest.questTitle}
              onChangeHandler={onChangeHandler}
              quest={quest}
              questIndex={questIndex}
              stepChecklist={checklist[questIndex]}
            />
          );
        })}
      </main>
    </div>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const questsPath = path.join(process.cwd(), 'src', 'quests');
  const questsFilesName = await fs.readdir(questsPath);

  const quests = questsFilesName.map(async (fileName) => {
    const data = await fs.readFile(path.join(questsPath, fileName));
    return JSON.parse(data.toString());
  });

  return {
    props: {
      quests: await Promise.all(quests),
    },
  };
}

export default Home;
