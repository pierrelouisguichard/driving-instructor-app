import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLogout } from "../hooks/useLogout";
import { User } from "../interface/Interfaces";
import { FaTrashCan } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<any[]>([]);
  const { logout } = useLogout();

  useEffect(() => {
    fetchRegisteredUsers();
    fetchPendingInvitations();
  }, []);

  const fetchRegisteredUsers = async () => {
    setLoading(true);
    setError(""); // Clear previous error messages
    try {
      const response = await fetch(`${API_URL}/api/user/allUsers`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRegisteredUsers(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch registered users.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch registered users: ... `);
      } else {
        setError("Failed to fetch registered users.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string, user: User) => {
    if (!id) return { success: false };

    try {
      const response = await fetch(`${API_URL}/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        fetchRegisteredUsers();
      } else {
        const error = await response.json();
        console.error("Error deleting User:", error);
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const fetchPendingInvitations = async () => {
    setLoading(true);
    setError(""); // Clear previous error messages
    try {
      const response = await fetch(`${API_URL}/api/user/pendingInvites`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPendingInvitations(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch pending invitations.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch pending invitations: ... `);
      } else {
        setError("Failed to fetch pending invitations.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvitation = async () => {
    if (!email) return;

    setLoading(true);
    setError(""); // Clear previous error messages

    try {
      const response = await fetch(`${API_URL}/api/user/invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Successful response
        console.log("Invitation sent successfully.");
        setEmail(""); // Clear the email input field
        fetchPendingInvitations(); // Refresh invitations list
      } else {
        // Error response
        const errorData = await response.json();
        setError(errorData.message || "Failed to send invitation.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to send invitation: ... `);
      } else {
        setError("Failed to send invitation.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    <DashboardContainer>
      <Title>Admin Dashboard</Title>

      <LogoutButton onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </LogoutButton>

      <Section>
        <SectionTitle>Send Invitation</SectionTitle>
        <SendInvitationContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <Button onClick={handleSendInvitation} disabled={loading}>
            {loading ? "Sending..." : "Send Invitation"}
          </Button>
        </SendInvitationContainer>
        {error && <Error>{error}</Error>}
      </Section>

      <Section>
        <SectionTitle>Registered Users</SectionTitle>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList>
            {registeredUsers.length > 0 ? (
              registeredUsers
                .filter((user) => !user.isAdmin)
                .map((user) => (
                  <UserItem key={user._id}>
                    {user.email}
                    <StyledButton onClick={() => deleteUser(user._id, user)}>
                      <FaTrashCan />
                    </StyledButton>
                  </UserItem>
                ))
            ) : (
              <p>No registered users found.</p>
            )}
          </UserList>
        )}
        {error && <Error>{error}</Error>}
      </Section>

      <Section>
        <SectionTitle>Pending Invitations Codes</SectionTitle>
        {loading ? (
          <p>Loading invitations...</p>
        ) : (
          <InvitationList>
            {pendingInvitations.length > 0 ? (
              pendingInvitations.map((invitation) => (
                <InvitationItem key={invitation._id}>
                  {invitation.code}
                </InvitationItem>
              ))
            ) : (
              <p>No pending invitations found.</p>
            )}
          </InvitationList>
        )}
        {error && <Error>{error}</Error>}
      </Section>
    </DashboardContainer>
  );
};

export default AdminDashboard;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 4px; // Rounded corners
  color: red;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 8px 12px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
    color: white;
  }
`;

// Styled Components
const DashboardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;

  &:disabled {
    background-color: #ff9999;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
`;

const SendInvitationContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #aaa;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 1rem;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  padding: 0.5rem 0;
`;

const InvitationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const InvitationItem = styled.li`
  padding: 0.5rem 0;
`;
