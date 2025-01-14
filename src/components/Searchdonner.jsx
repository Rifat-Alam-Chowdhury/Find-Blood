import { useNavigate } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";

function Searchdonner() {
  const [group, distric] = uselocationapi();

  const navigate = useNavigate();

  const HandleSearchForm = (e) => {
    e.preventDefault();
    const name = e.target.group.value;
    const district = e.target.district.value;
    const date = e.target.date.value;

    navigate("Search-donner", {
      state: { name, district, date },
    });
  };

  return (
    <>
      <div className="text-center">
        <h1>Search Donors</h1>
      </div>
      <form onSubmit={HandleSearchForm} className="w-11/12 mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <select className="select w-full max-w-xs" name="group">
            <option disabled selected>
              Group
            </option>
            {group?.map((group, index) => (
              <option key={index} value={group.group}>
                {group.group}
              </option>
            ))}
          </select>

          <select className="select w-full max-w-xs" name="district">
            <option disabled selected>
              Select District
            </option>
            {distric?.map((district, index) => (
              <option key={index} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="date"
              className="grow"
              name="date"
              placeholder="Date"
            />
          </label>
          <button type="submit" className="btn">
            search
          </button>
        </div>
      </form>
    </>
  );
}

export default Searchdonner;
