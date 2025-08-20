import { useState } from 'react';

import { Container } from '../components/Container/Container';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { HeaderCell } from '../components/HeaderCell/HeaderCell';
import { Modal } from '../components/Modal/Modal';
import { UserRow } from '../components/UserRow/UserRow';
import { MOCKED_DATA } from '../shared/constants';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <h1 className="text-size-32 mb-3 text-center font-light">Manage Data</h1>
      <div className="py-3 px-4 border-2 rounded-2xl border-border shadow-sm shadow-border">
        <ControlPanel onClick={() => setIsModalOpen(true)} />
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="mb-3 text-size-20 text-left">
              Users 2025
            </caption>
            <thead className="select-none border-b-2 border-border/5 bg-border/10">
              <tr>
                <HeaderCell
                  title="Name"
                  onClick={() => console.log('sort by name')}
                />
                <HeaderCell
                  title="Date"
                  onClick={() => console.log('sort by date')}
                />
                <HeaderCell
                  title="Value"
                  onClick={() => console.log('sort by value')}
                />
                <th className="px-3 py-2 text-size-18">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCKED_DATA.map(({ id, name, date, value }) => (
                <UserRow key={id} name={name} date={date} value={value} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </Container>
  );
};

export default Home;
