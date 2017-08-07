// My Sequelize Car model
module.exports = function (sequelize, DataTypes) {
    var Car = sequelize.define("cars", {
        make: {
            type: DataTypes.STRING,
            // Add a flag for the burger_name attribute to prevent this field from being null
            allowNull: false,
            // Add a validation for the burger_name attribute to make sure it's at least one character,
            // but no more than 140 characters
            validate: {
                len: [1]
            }
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        miles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        sold: {
            type: DataTypes.BOOLEAN,
            // Add a flag for devoured so that it's false by default if not given a value
            defaultValue: false
        }
    });
    return Car;
}
// Car.sync();