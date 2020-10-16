/*TODO 
    ORGANIZATION ID - FOREIGN KEY
*/

module.exports = (sequelize, DataTypes) => {
    const Volunteer = sequelize.define('Volunteer', {
        first_name: {
            type: DataTypes.STRING,
            //allowNull: false
            get() {
                return this.getDataValue(first_name).toUpperCase()
            }
        },
        middle_name: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        last_name: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.INTEGER,
            //allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        profile_picture_path: {
            type: DataTypes.STRING(1000),
            //allowNull: false
        },
        native_place: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        address: {
            type: DataTypes.STRING(2000),
            //allowNull: false
        },
        pin_code: {
            type: DataTypes.INTEGER,
            //allowNull: false
        },
        date_of_birth: {
            type: DataTypes.DATE,
            //allowNull: false
        },
        blood_group: {
            type: DataTypes.STRING
        },
        education: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        occupation: {
            type: DataTypes.STRING,
            //allowNull: false
        },
        created_by: {
            type: DataTypes.STRING,
        },
        updatedBy: {
            type: DataTypes.STRING
        },
        row_state: {
            type: DataTypes.STRING,
            defaultValue: 'alive'
        },
        registration_date: {
            type: DataTypes.DATE,
            //allowNull: false
        },
        expiration_date: {
            type: DataTypes.DATE,
            //allowNull: false
        }
    })
    return Volunteer;
}