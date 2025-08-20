import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { HiMiniArrowLongUp } from 'react-icons/hi2';

import { Container } from '../components/Container/Container';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { MOCKED_DATA } from '../shared/constants';

const Home = () => {
  return (
    <Container>
      <h1 className="text-size-32 mb-3 text-center font-light">Manage Data</h1>
      <div className="py-3 px-4 border-2 rounded-2xl border-border shadow-sm shadow-border">
        <ControlPanel />
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="mb-3 text-size-20 text-left">
              Users 2025
            </caption>
            <thead className="select-none border-b-2 border-border/5 bg-border/10">
              <tr>
                <th
                  className="px-3 py-2 text-left cursor-pointer hover:opacity-70 hover:transition-opacity duration-300"
                  onClick={() => console.log('sort by name')}
                >
                  <div className="flex items-center justify-between text-size-18">
                    Name
                    <HiMiniArrowLongUp />
                  </div>
                </th>
                <th
                  className="px-3 py-2 text-left cursor-pointer hover:opacity-70 hover:transition-opacity duration-300"
                  onClick={() => console.log('sort by date')}
                >
                  <div className="flex items-center justify-between text-size-18">
                    Date
                    <HiMiniArrowLongUp />
                  </div>
                </th>
                <th
                  className="px-3 py-2 text-left cursor-pointer hover:opacity-70 hover:transition-opacity duration-300"
                  onClick={() => console.log('sort by value')}
                >
                  <div className="flex items-center justify-between text-size-18">
                    Value
                    <HiMiniArrowLongUp />
                  </div>
                </th>
                <th className="px-3 py-2 text-size-18">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCKED_DATA.map(({ id, name, date, value }) => (
                <tr
                  key={id}
                  className="hover:bg-border/5 hover:transition-colors duration-100 whitespace-nowrap"
                >
                  <td className="px-3 py-2 text-size-16 color-text">{name}</td>
                  <td className="px-3 py-2 text-size-16 color-text">{date}</td>
                  <td className="px-3 py-2 text-size-16 color-text">{value}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 justify-around">
                      <button
                        className="cursor-pointer text-button hover:scale-110 hover:transition-transform duration-200"
                        onClick={() => console.log('edit')}
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        className="cursor-pointer text-remove hover:scale-110 hover:transition-transform duration-200"
                        onClick={() => console.log('delete')}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Home;
