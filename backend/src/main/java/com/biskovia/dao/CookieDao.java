package com.biskovia.dao;

import com.biskovia.config.DbConnection;
import com.biskovia.model.CookieItem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CookieDao {
    public List<CookieItem> findAll() throws SQLException {
        String sql = "SELECT id, name, description, price, available FROM cookies";
        List<CookieItem> items = new ArrayList<>();
        try (Connection connection = DbConnection.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                CookieItem item = mapRow(resultSet);
                items.add(item);
            }
        }
        return items;
    }

    public CookieItem findById(int id) throws SQLException {
        String sql = "SELECT id, name, description, price, available FROM cookies WHERE id = ?";
        try (Connection connection = DbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapRow(resultSet);
                }
            }
        }
        return null;
    }

    public CookieItem insert(CookieItem item) throws SQLException {
        String sql = "INSERT INTO cookies (name, description, price, available) VALUES (?, ?, ?, ?)";
        try (Connection connection = DbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, item.getName());
            statement.setString(2, item.getDescription());
            statement.setDouble(3, item.getPrice());
            statement.setBoolean(4, item.isAvailable());
            statement.executeUpdate();
            try (ResultSet keys = statement.getGeneratedKeys()) {
                if (keys.next()) {
                    item.setId(keys.getInt(1));
                }
            }
        }
        return item;
    }

    public CookieItem update(CookieItem item) throws SQLException {
        String sql = "UPDATE cookies SET name = ?, description = ?, price = ?, available = ? WHERE id = ?";
        try (Connection connection = DbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, item.getName());
            statement.setString(2, item.getDescription());
            statement.setDouble(3, item.getPrice());
            statement.setBoolean(4, item.isAvailable());
            statement.setInt(5, item.getId());
            statement.executeUpdate();
        }
        return item;
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM cookies WHERE id = ?";
        try (Connection connection = DbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        }
    }

    private CookieItem mapRow(ResultSet resultSet) throws SQLException {
        CookieItem item = new CookieItem();
        item.setId(resultSet.getInt("id"));
        item.setName(resultSet.getString("name"));
        item.setDescription(resultSet.getString("description"));
        item.setPrice(resultSet.getDouble("price"));
        item.setAvailable(resultSet.getBoolean("available"));
        return item;
    }
}
