package com.biskovia.servlet;

import com.biskovia.dao.CookieDao;
import com.biskovia.model.CookieItem;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "cookieServlet", urlPatterns = "/api/cookies")
public class CookieServlet extends HttpServlet {
    private final CookieDao cookieDao = new CookieDao();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        try {
            List<CookieItem> items = cookieDao.findAll();
            objectMapper.writeValue(response.getOutputStream(), items);
        } catch (SQLException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Unable to load cookies\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        try {
            CookieItem item = objectMapper.readValue(request.getInputStream(), CookieItem.class);
            CookieItem created = cookieDao.insert(item);
            objectMapper.writeValue(response.getOutputStream(), created);
        } catch (SQLException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Unable to create cookie\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        try {
            CookieItem item = objectMapper.readValue(request.getInputStream(), CookieItem.class);
            CookieItem updated = cookieDao.update(item);
            objectMapper.writeValue(response.getOutputStream(), updated);
        } catch (SQLException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Unable to update cookie\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String idParam = request.getParameter("id");
        if (idParam == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Missing id parameter\"}");
            return;
        }
        response.setContentType("application/json");
        try {
            int id = Integer.parseInt(idParam);
            cookieDao.delete(id);
            response.getWriter().write("{\"status\":\"deleted\"}");
        } catch (SQLException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Unable to delete cookie\"}");
        }
    }
}
