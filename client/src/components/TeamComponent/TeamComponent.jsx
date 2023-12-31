import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamsComponent = () => {
  const [teams, setTeams] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamWins, setNewTeamWins] = useState("0");
  const [newTeamLosses, setNewTeamLosses] = useState("0");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get("http://localhost:5005/api/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch teams:", error);
      });
  };

  const createTeam = () => {
    axios
      .post("http://localhost:5005/api/teams", {
        name: newTeamName,
      })
      .then((response) => {
        console.log("Team created:", response.data);
        fetchTeams(); // Refresh the teams list after creating a new team
        setNewTeamName("");
      })
      .catch((error) => {
        console.error("Failed to create team:", error);
      });
  };

  const deleteTeam = (teamId) => {
    axios
      .delete(`http://localhost:5005/api/teams/${teamId}`)
      .then(() => {
        console.log("Team deleted");
        fetchTeams(); // Refresh the teams list after deleting a team
      })
      .catch((error) => {
        console.error("Failed to delete team:", error);
      });
  };

  const startEditing = (teamId, teamName) => {
    setEditingTeamId(teamId);
    setNewTeamName(teamName);
  };

  const cancelEditing = () => {
    setEditingTeamId(null);
    setNewTeamName("");
  };

  const updateTeam = (teamId) => {
    const updatedTeam = {
      name: newTeamName,
      statistics: {
        wins: newTeamWins,
        losses: newTeamLosses,
      },
    };

    axios
      .put(`http://localhost:5005/api/teams/${teamId}`, updatedTeam)
      .then((response) => {
        console.log("Team updated:", response.data);
        fetchTeams(); // Refresh the teams list after updating a team
        cancelEditing();
      })
      .catch((error) => {
        console.error("Failed to update team:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Admin Page</h1>

      {/* Create Team Form */}
      <div className="my-4">
        <h2 className="text-xl font-bold mb-2">Create New Team</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTeam();
          }}
        >
          {/* Team Name */}
          <label className="block mb-2">
            Team Name:
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              required
            />
          </label>
          {/* Team Wins */}
          <label className="block mb-2">
            Team Wins:
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              value={newTeamWins}
              onChange={(e) => setNewTeamWins(e.target.value)}
              required
            />
          </label>
          {/* Team Losses */}
          <label className="block mb-2">
            Team Wins:
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              value={newTeamLosses}
              onChange={(e) => setNewTeamLosses(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Create Team
          </button>
        </form>
      </div>

      {/* Teams List */}
      <div className="my-4">
        <h2 className="text-xl font-bold mb-2">Teams List</h2>
        <ul className="list-disc pl-6">
          {teams.map((team) => (
            <li key={team._id} className="mb-2">
              {editingTeamId === team._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    required
                  />
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-md"
                    onClick={() => updateTeam(team._id)}
                  >
                    Done
                  </button>
                  <button
                    className="bg-gray-500 text-white py-1 px-2 rounded-md ml-2"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <React.Fragment>
                  {team.name}
                  <button
                    className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => deleteTeam(team._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-4 bg-green-500 text-white py-1 px-2 rounded-md"
                    onClick={() => startEditing(team._id, team.name)}
                  >
                    Update
                  </button>
                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsComponent;
