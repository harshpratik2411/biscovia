package com.biskovia.servlet;

import com.biskovia.dao.UserDao;
import com.biskovia.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet(name = "adminAuthServlet", urlPatterns = {"/api/admin/login", "/api/admin/logout"})
public class AdminAuthServlet extends HttpServlet {
    private final UserDao userDao = new UserDao();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String path = request.getServletPath();
        if ("/api/admin/logout".equals(path)) {
            handleLogout(request, response);
        } else {
            handleLogin(request, response);
        }
    }

    private void handleLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        AdminLoginRequest loginRequest = objectMapper.readValue(request.getInputStream(), AdminLoginRequest.class);
        try {
            User user = userDao.findByEmailAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
            if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\":\"Invalid admin credentials\"}");
                return;
            }
            HttpSession session = request.getSession(true);
            session.setAttribute("adminId", user.getId());
            session.setAttribute("adminEmail", user.getEmail());
            session.setAttribute("role", user.getRole());
            response.getWriter().write("{\"status\":\"ok\",\"role\":\"ADMIN\"}");
        } catch (SQLException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Unable to login admin\"}");
        }
    }

    private void handleLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setContentType("application/json");
        response.getWriter().write("{\"status\":\"admin_logged_out\"}");
    }

    public static class AdminLoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
