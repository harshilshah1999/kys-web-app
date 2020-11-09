
module.exports = (sequelize, DataTypes) => {
    const Shakha = sequelize.define('Shakha', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,

        },
        pin_code: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        row_state: {
            type: DataTypes.STRING,
            defaultValue: 'alive'
        }
    })
    return Shakha;
}