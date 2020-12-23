module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shakha_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pre_registration: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        expected_participation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        driver: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.BIGINT,
            allowNull: false
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
    return Event;
}