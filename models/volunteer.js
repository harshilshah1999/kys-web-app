/*TODO 
    ORGANIZATION ID - FOREIGN KEY
*/

module.exports = (sequelize, DataTypes) => {
    const Volunteer = sequelize.define('Volunteer', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        shakha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_picture_path: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        native_place: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        pin_code: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return new Date(this.getDataValue('date_of_birth')).toISOString().substr(0, 10)
            }
        },
        blood_group: {
            type: DataTypes.STRING
        },
        education: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return new Date(this.getDataValue('registration_date')).toISOString().substr(0, 10)
            }
        },
        expiration_date: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                return new Date(this.getDataValue('expiration_date')).toISOString().substr(0, 10)
            }
        },
        createdBy: {
            type: DataTypes.STRING,
        },
        updatedBy: {
            type: DataTypes.STRING
        },
        row_state: {
            type: DataTypes.STRING,
            defaultValue: 'alive'
        }
    })
    return Volunteer;
}