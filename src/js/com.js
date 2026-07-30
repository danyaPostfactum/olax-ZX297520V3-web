define("service", "underscore jquery set CryptoJS".split(" "), function(cg, cP, aH, bv) {
    function bb(dc, db) {
        if (cg.isArray(dc)) {
            for (var dd = 0; dd < dc.length; dd++) {
                c2(dc[dd])
            }
        } else {
            c2(dc)
        }
        cQ(db)
    }

    function m(dc, db) {
        if (cg.isArray(dc)) {
            for (var dd = 0; dd < dc.length; dd++) {
                bp(dc[dd])
            }
        } else {
            bp(dc)
        }
        C(db)
    }

    function aR() {
        return a1({}).get_user_mac_addr
    }

    function bT(db, de) {
        return bz(arguments, {}, dc, dd, null, false);

        function dc(df, dg) {
            return {
                multi_data: 1,
                cmd: "DDNS_Enable,DDNS_Mode,DDNSProvider,DDNSAccount,DDNSPassword,DDNS,DDNS_Hash_Value"
            }
        }

        function dd(df) {
            if (df) {
                return {
                    DDNS_Enable: df.DDNS_Enable,
                    DDNS_Mode: df.DDNS_Mode,
                    DDNSProvider: df.DDNSProvider,
                    DDNSAccount: df.DDNSAccount,
                    DDNSPassword: df.DDNSPassword,
                    DDNS: df.DDNS,
                    DDNS_Hash_Value: df.DDNS_Hash_Value
                }
            } else {
                return V
            }
        }
    }

    function aS() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = cP.extend({}, dd);
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ci() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "modem_main_state,puknumber,pinnumber,blc_wan_mode,blc_wan_auto_mode,psw_fail_num_str,login_lock_time,psw_changed";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                if (dd.blc_wan_mode == "AUTO") {
                    dd.blc_wan_mode = dd.blc_wan_auto_mode ? dd.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    dd.blc_wan_mode = dd.blc_wan_mode ? dd.blc_wan_mode : "PPP"
                }
                dd.psw_fail_num_str = dd.psw_fail_num_str == "" ? aH.MAX_LOGIN_COUNT : dd.psw_fail_num_str;
                dd.login_lock_time = dd.login_lock_time == "" ? "300" : dd.login_lock_time;
                return dd
            } else {
                return V
            }
        }
    }

    function aO() {
        return bz(arguments, {}, db, dc, {
            errorType: "badPassword"
        }, true);

        function db(dd, de) {
            var df = {
                goformId: "LOGIN",
                password: aH.PASSWORD_ENCODE ? Base64.encode(dd.password) : dd.password
            };
            return df
        }

        function dc(dd) {
            if (dd && (dd.result == "0" || dd.result == "4")) {
                bu.isLoggedIn = true;
                return {
                    result: true
                }
            } else {
                var de = {};
                switch (dd.result) {
                    case "1":
                        de = {
                            errorType: "Login Fail"
                        };
                        break;
                    case "2":
                        de = {
                            errorType: "duplicateUser"
                        };
                        break;
                    case "3":
                        de = {
                            errorType: "badPassword"
                        };
                        break;
                    default:
                        de = {
                            errorType: "Login Fail"
                        };
                        break
                }
                bu.isLoggedIn = false;
                return cP.extend(V, de)
            }
        }
    }

    function bd() {
        if (bu.isLoggedIn != undefined) {
            return bz(arguments, {
                status: bu.isLoggedIn ? "loggedIn" : "loggedOut"
            })
        } else {
            var dd = {};
            if (!aH.HAS_LOGIN) {
                dd.status = "loggedIn";
                dd.errorType = "no_login";
                bu.isLoggedIn = true
            }
            return bz(arguments, dd, db, dc, null, false)
        }

        function db(de, df) {
            var dg = {};
            dg.cmd = "loginfo";
            dg.multi_data = 1;
            return dg
        }

        function dc(df) {
            if (df && df.loginfo || df.loginfo == "") {
                var de = {};
                switch (df.loginfo) {
                    case "ok":
                        bu.isLoggedIn = true;
                        de.status = "loggedIn";
                        break;
                    default:
                        bu.isLoggedIn = false;
                        de.status = "loggedOut";
                        break
                }
                return de
            } else {
                bu.isLoggedIn = undefined;
                return cP.extend(V, {
                    errorType: "LoginStatusError"
                })
            }
        }
    }

    function J() {
        return bz(arguments, {}, db, dc, {}, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ENTER_PIN";
            df.PinNumber = dd.PinNumber;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function T() {
        return bz(arguments, {}, db, dc, {}, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ENTER_PUK";
            df.PUKNumber = dd.PUKNumber;
            df.PinNumber = dd.PinNumber;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function e() {
        if (bu.isLoggedIn === undefined) {
            var db = bd();
            return {
                networkType: bu.networkType,
                signalImg: bu.signalImg,
                networkOperator: bu.networkOperator,
                spn_b1_flag: bu.spn_b1_flag,
                spn_name_data: bu.spn_name_data,
                spn_b2_flag: bu.spn_b2_flag,
                connectStatus: bu.connectStatus,
                rj45ConnectStatus: bu.rj45ConnectStatus,
                ssid1AttachedNum: bu.ssid1AttachedNum,
                ssid2AttachedNum: bu.ssid2AttachedNum,
                wirelessDeviceNum: bu.ssid1AttachedNum + bu.ssid2AttachedNum,
                roamingStatus: bu.roamingStatus,
                wifiStatus: bu.wifiStatus,
                simStatus: bu.simStatus,
                pinStatus: bu.pinStatus,
                batteryStatus: bu.batteryStatus,
                batteryLevel: bu.batteryLevel,
                batteryPers: bu.batteryPers,
                batteryTime: bu.batteryTime,
                ssid: bu.ssid,
                authMode: bu.authMode,
                data_counter: bu.data_counter,
                isLoggedIn: db.status == "loggedIn",
                newSmsReceived: bu.newSmsReceived,
                smsReportReceived: bu.smsReportReceived,
                smsUnreadCount: bu.smsUnreadCount,
                limitVolumeEnable: bu.limitVolumeEnable,
                limitVolumeType: bu.limitVolumeType,
                limitVolumePercent: bu.limitVolumePercent,
                limitVolumeSize: bu.limitVolumeSize,
                connectWifiProfile: bu.connectWifiProfile,
                connectWifiSSID: bu.connectWifiSSID,
                connectWifiStatus: bu.connectWifiStatus,
                multi_ssid_enable: bu.multi_ssid_enable,
                roamMode: bu.roamMode,
                blc_wan_mode: bu.blc_wan_mode,
                current_upgrade_state: bu.current_upgrade_state,
                is_mandatory: bu.is_mandatory,
                new_version_state: bu.new_version_state,
                allowRoamingUpdate: bu.allowRoamingUpdate,
                ap_station_enable: bu.ap_station_enable,
                ap_station_mode: bu.ap_station_mode,
                dialMode: bu.dialMode,
                fota_package_already_download: bu.fota_package_already_download,
                ethWanMode: bu.ethWanMode,
                fota_user_selector: bu.fota_user_selector,
                defaultWanName: bu.defaultWanName
            }
        }
        return {
            networkType: bu.networkType,
            signalImg: bu.signalImg,
            networkOperator: bu.networkOperator,
            spn_b1_flag: bu.spn_b1_flag,
            spn_name_data: bu.spn_name_data,
            spn_b2_flag: bu.spn_b2_flag,
            connectStatus: bu.connectStatus,
            rj45ConnectStatus: bu.rj45ConnectStatus,
            ssid1AttachedNum: bu.ssid1AttachedNum,
            ssid2AttachedNum: bu.ssid2AttachedNum,
            wirelessDeviceNum: bu.ssid1AttachedNum + bu.ssid2AttachedNum,
            roamingStatus: bu.roamingStatus,
            wifiStatus: bu.wifiStatus,
            simStatus: bu.simStatus,
            pinStatus: bu.pinStatus,
            batteryStatus: bu.batteryStatus,
            batteryLevel: bu.batteryLevel,
            batteryPers: bu.batteryPers,
            batteryTime: bu.batteryTime,
            ssid: bu.ssid,
            authMode: bu.authMode,
            data_counter: bu.data_counter,
            isLoggedIn: bu.isLoggedIn,
            newSmsReceived: bu.newSmsReceived,
            smsReportReceived: bu.smsReportReceived,
            smsUnreadCount: bu.smsUnreadCount,
            limitVolumeEnable: bu.limitVolumeEnable,
            limitVolumeType: bu.limitVolumeType,
            limitVolumePercent: bu.limitVolumePercent,
            limitVolumeSize: bu.limitVolumeSize,
            connectWifiProfile: bu.connectWifiProfile,
            connectWifiSSID: bu.connectWifiSSID,
            connectWifiStatus: bu.connectWifiStatus,
            multi_ssid_enable: bu.multi_ssid_enable,
            blc_wan_mode: bu.blc_wan_mode,
            roamMode: bu.roamMode,
            current_upgrade_state: bu.current_upgrade_state,
            is_mandatory: bu.is_mandatory,
            new_version_state: bu.new_version_state,
            allowRoamingUpdate: bu.allowRoamingUpdate,
            ap_station_enable: bu.ap_station_enable,
            ap_station_mode: bu.ap_station_mode,
            dialMode: bu.dialMode,
            fota_package_already_download: bu.fota_package_already_download,
            ethWanMode: bu.ethWanMode,
            fota_user_selector: bu.fota_user_selector,
            defaultWanName: bu.defaultWanName
        }
    }

    function by() {
        var dc = bu.limitVolumeType == "1";
        var db = {
            data_counter: bu.data_counter,
            connectStatus: bu.connectStatus,
            rj45ConnectStatus: bu.rj45ConnectStatus,
            limitVolumeEnable: bu.limitVolumeEnable,
            limitVolumeType: bu.limitVolumeType,
            limitVolumePercent: bu.limitVolumePercent,
            networkType: bu.networkType
        };
        if (dc) {
            db.limitDataMonth = bu.limitVolumeSize;
            db.limitTimeMonth = 0
        } else {
            db.limitTimeMonth = bu.limitVolumeSize;
            db.limitDataMonth = 0
        }
        db.blc_wan_mode = bu.blc_wan_mode;
        return db
    }

    function E() {
        bu.newSmsReceived = false
    }

    function b3() {
        bu.smsReportReceived = false
    }

    function b() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "sms_capacity_info";
            return df
        }

        function dc(dd) {
            return {
                nvTotal: parseInt(dd.sms_nv_total, 10),
                nvUsed: parseInt(dd.sms_nv_rev_total, 10) + parseInt(dd.sms_nv_send_total, 10) + parseInt(dd.sms_nv_draftbox_total, 10),
                simTotal: parseInt(dd.sms_sim_total, 10),
                simUsed: parseInt(dd.sms_sim_rev_total, 10) + parseInt(dd.sms_sim_send_total, 10) + parseInt(dd.sms_sim_draftbox_total, 10),
                nvReceive: parseInt(dd.sms_nv_rev_total, 10),
                nvSend: parseInt(dd.sms_nv_send_total, 10),
                nvDraft: parseInt(dd.sms_nv_draftbox_total, 10),
                simReceive: parseInt(dd.sms_sim_rev_total, 10),
                simSend: parseInt(dd.sms_sim_send_total, 10),
                simDraft: parseInt(dd.sms_sim_draftbox_total, 10)
            }
        }
    }

    function a7() {
        var df = arguments[1];
        var de = 0;
        return bz(arguments, {}, db, dd, null, true);

        function db(dg, dh) {
            var di = {};
            di.notCallback = true;
            di.goformId = "CONNECT_NETWORK";
            return di
        }

        function dd(dg) {
            if (dg.result == "success") {
                de = new Date().getTime();
                cQ(dc)
            } else {
                df({
                    result: false
                })
            }
        }

        function dc(dg) {
            if (dg.ppp_status == "ppp_connecting") {
                bu.connectStatus = "ppp_connecting"
            } else {
                if (dg.ppp_status == "ppp_connected") {
                    C(dc);
                    bu.connectStatus = "ppp_connected";
                    df({
                        result: true,
                        status: bu.connectStatus
                    })
                } else {
                    if (new Date().getTime() - de < 10000) {
                        bu.connectStatus = "ppp_connecting"
                    } else {
                        C(dc);
                        df({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function P() {
        var df = arguments[1];
        var de = 0;
        return bz(arguments, {}, dc, dd, null, true);

        function dc(dg, dh) {
            var di = {};
            di.notCallback = true;
            di.goformId = "DISCONNECT_NETWORK";
            return di
        }

        function dd(dg) {
            if (dg.result == "success") {
                de = new Date().getTime();
                cQ(db)
            } else {
                df({
                    result: false
                })
            }
        }

        function db(dg) {
            if (dg.ppp_status == "ppp_disconnecting") {
                bu.connectStatus = "ppp_disconnecting"
            } else {
                if (dg.ppp_status == "ppp_disconnected") {
                    C(db);
                    bu.connectStatus = "ppp_disconnected";
                    df({
                        result: true,
                        status: bu.connectStatus
                    })
                } else {
                    if (new Date().getTime() - de < 10000) {
                        bu.connectStatus = "ppp_disconnecting"
                    } else {
                        C(db);
                        df({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function l() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19,m_profile_name,profile_name,wan_dial,pdp_type,pdp_select,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passtmp,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passtmp,apn_num_preset";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return {
                    APNs: dd.APN_configtmp0 + "||" + dd.APN_configtmp1 + "||" + dd.APN_configtmp2 + "||" + dd.APN_configtmp3 + "||" + dd.APN_configtmp4 + "||" + dd.APN_configtmp5 + "||" + dd.APN_configtmp6 + "||" + dd.APN_configtmp7 + "||" + dd.APN_configtmp8 + "||" + dd.APN_configtmp9 + "||" + dd.APN_configtmp10 + "||" + dd.APN_configtmp11 + "||" + dd.APN_configtmp12 + "||" + dd.APN_configtmp13 + "||" + dd.APN_configtmp14 + "||" + dd.APN_configtmp15 + "||" + dd.APN_configtmp16 + "||" + dd.APN_configtmp17 + "||" + dd.APN_configtmp18 + "||" + dd.APN_configtmp19,
                    ipv6APNs: dd.ipv6_APN_configtmp0 + "||" + dd.ipv6_APN_configtmp1 + "||" + dd.ipv6_APN_configtmp2 + "||" + dd.ipv6_APN_configtmp3 + "||" + dd.ipv6_APN_configtmp4 + "||" + dd.ipv6_APN_configtmp5 + "||" + dd.ipv6_APN_configtmp6 + "||" + dd.ipv6_APN_configtmp7 + "||" + dd.ipv6_APN_configtmp8 + "||" + dd.ipv6_APN_configtmp9 + "||" + dd.ipv6_APN_configtmp10 + "||" + dd.ipv6_APN_configtmp11 + "||" + dd.ipv6_APN_configtmp12 + "||" + dd.ipv6_APN_configtmp13 + "||" + dd.ipv6_APN_configtmp14 + "||" + dd.ipv6_APN_configtmp15 + "||" + dd.ipv6_APN_configtmp16 + "||" + dd.ipv6_APN_configtmp17 + "||" + dd.ipv6_APN_configtmp18 + "||" + dd.ipv6_APN_configtmp19,
                    apnMode: dd.apn_mode,
                    profileName: dd.m_profile_name || dd.profile_name,
                    wanDial: dd.wan_dial,
                    pdpType: dd.pdp_type == "IP" ? "IP" : dd.ipv6_pdp_type,
                    pdpSelect: dd.pdp_select,
                    index: dd.index,
                    currIndex: dd.Current_index,
                    autoApns: dd.apn_auto_config,
                    autoApnsV6: dd.ipv6_apn_auto_config,
                    wanApn: dd.wan_apn,
                    authMode: dd.ppp_auth_mode.toLowerCase(),
                    username: dd.ppp_username,
                    password: dd.ppp_passtmp,
                    dnsMode: "",
                    dns1: "",
                    dns2: "",
                    wanApnV6: dd.ipv6_wan_apn,
                    authModeV6: dd.ipv6_ppp_auth_mode.toLowerCase(),
                    usernameV6: dd.ipv6_ppp_username,
                    passwordV6: dd.ipv6_ppp_passtmp,
                    dnsModeV6: "",
                    dns1V6: "",
                    dns2V6: "",
                    apnNumPreset: dd.apn_num_preset
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function az() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                apn_action: "delete",
                apn_mode: "manual",
                index: dd.index
            };
            df.goformId = "APN_PROC_EX";
            return df
        }

        function dc(dd) {
            if (dd.result == "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function bx() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, df) {
            var de = {
                goformId: "APN_PROC_EX",
                apn_mode: dd.apnMode
            };
            if (dd.apnMode == "manual") {
                de.apn_action = "set_default";
                de.set_default_flag = "1";
                de.pdp_type = dd.pdpType;
                de.index = dd.index
            }
            return de
        }

        function dc(dd) {
            if (dd.result == "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function bo() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "APN_PROC_EX",
                apn_action: "save",
                apn_mode: "manual",
                profile_name: dd.profileName,
                wan_dial: "*99#",
                pdp_type: dd.pdpType,
                pdp_select: "auto",
                index: dd.index
            };
            if (dd.pdpType == "IP") {
                cP.extend(df, {
                    wan_apn: dd.wanApn,
                    ppp_auth_mode: dd.authMode,
                    ppp_username: dd.username,
                    ppp_passtmp: dd.password
                })
            } else {
                if (dd.pdpType == "IPv6") {
                    cP.extend(df, {
                        ipv6_wan_apn: dd.wanApnV6,
                        ipv6_ppp_auth_mode: dd.authModeV6,
                        ipv6_ppp_username: dd.usernameV6,
                        ipv6_ppp_passtmp: dd.passwordV6
                    })
                } else {
                    cP.extend(df, {
                        wan_apn: dd.wanApn,
                        ppp_auth_mode: dd.authMode,
                        ppp_username: dd.username,
                        ppp_passtmp: dd.password,
                        dns_mode: dd.dnsMode,
                        prefer_dns_manual: dd.dns1,
                        standby_dns_manual: dd.dns2,
                        ipv6_wan_apn: dd.wanApnV6,
                        ipv6_ppp_auth_mode: dd.authModeV6,
                        ipv6_ppp_username: dd.usernameV6,
                        ipv6_ppp_passtmp: dd.passwordV6
                    })
                }
            }
            return df
        }

        function dc(dd) {
            if (dd.result == "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }
    var cX = ["modem_main_state", "pin_status", "blc_wan_mode", "blc_wan_auto_mode", "loginfo", "fota_new_version_state", "fota_current_upgrade_state", "fota_upgrade_selector", "network_provider", "is_mandatory", "sta_count", "m_sta_count"];
    var aw = ["signalbar", "network_type", "sub_network_type", "ppp_status", "rj45_state", "EX_SSID1", "sta_ip_status", "EX_wifi_profile", "m_ssid_enable", "wifi_cur_state", "SSID1", "simcard_roam", "lan_ipaddr", "battery_charging", "battery_vol_percent", "battery_pers", "spn_name_data", "spn_b1_flag", "spn_b2_flag", "realtime_tx_bytes", "realtime_rx_bytes", "realtime_time", "realtime_tx_thrpt", "realtime_rx_thrpt", "monthly_rx_bytes", "monthly_tx_bytes", "traffic_alined_delta", "monthly_time", "date_month", "data_volume_limit_switch", "data_volume_limit_size", "data_volume_alert_percent", "data_volume_limit_unit", "roam_setting_option", "upg_roam_switch", "fota_package_already_download", "ssid", "dial_mode", "ethwan_mode", "default_wan_name"];
    if (aH.HAS_SMS) {
        cP.merge(aw, ["sms_received_flag", "sts_received_flag", "sms_unread_num"])
    }
    var aT = [];
    var bM = [bn];

    function aU() {
        if (!cO) {
            setTimeout(function() {
                aU()
            }, 1000);
            return
        }
        var db = cv();
        c7(db, function(dc) {
            for (var dd = 0; dd < bM.length; dd++) {
                if (typeof bM[dd] === "function") {
                    bM[dd](dc)
                }
            }
            cP.merge(bM, aT);
            aT = [];
            setTimeout(function() {
                aU()
            }, 1000)
        }, function() {
            cK();
            setTimeout(function() {
                aU()
            }, 1000)
        }, false)
    }

    function cv() {
        var db = {
            multi_data: 1
        };
        if (window.location.hash && window.location.hash != "#entry" && bu.isLoggedIn) {
            if (aH.HAS_SMS) {
                db.sms_received_flag_flag = 0;
                db.sts_received_flag_flag = 0
            }
            if (aw.length > 0 && cg.indexOf(cX, aw[0]) == -1) {
                cP.each(aw, function(dc, dd) {
                    cX.push(dd)
                })
            }
        } else {
            if (aw.length > 0 && cg.indexOf(cX, aw[0]) != -1) {
                cX = cg.without(cX, aw)
            }
        }
        db.cmd = cX.join(",");
        return db
    }

    function cQ(db) {
        if (cg.indexOf(aT, db) == -1) {
            aT.push(db)
        }
    }

    function C(db) {
        bM = cg.without(bM, db);
        if (bM.length == 0) {
            bM.push(bn)
        }
        return aT
    }

    function c2(db) {
        if (cg.indexOf(cX, db) == -1) {
            cX.push(db)
        }
    }

    function bp(db) {
        cX = cg.without(cX, db);
        return cX
    }

    function bn(dc) {
        bu.defaultWanName = dc.default_wan_name;
        bu.signalImg = typeof dc.signalbar == "undefined" ? "0" : dc.signalbar;
        bu.networkType = dc.sub_network_type ? dc.sub_network_type : (dc.network_type ? dc.network_type : "");
        if (bu.networkType.toLowerCase().indexOf("limited_service") != -1 || bu.networkType.toLowerCase().indexOf("limited service") != -1) {
            bu.networkType = "limited_service"
        } else {
            if (bu.networkType.toLowerCase().indexOf("no_service") != -1 || bu.networkType.toLowerCase().indexOf("no service") != -1) {
                bu.networkType = "no_service"
            }
        }
        bu.networkOperator = dc.network_provider ? dc.network_provider : "";
        bu.spn_b1_flag = dc.spn_b1_flag;
        bu.spn_b2_flag = dc.spn_b2_flag;
        bu.spn_name_data = dc.spn_name_data;
        bu.connectStatus = typeof dc.ppp_status == "undefined" ? "ppp_disconnected" : dc.ppp_status;
        bu.rj45ConnectStatus = (typeof dc.rj45_state == "undefined" || dc.rj45_state == "") ? "dead" : dc.rj45_state;
        bu.ethWanMode = dc.ethwan_mode;
        bu.ssid1AttachedNum = dc.sta_count == "" ? 0 : parseInt(dc.sta_count, 10);
        bu.ssid2AttachedNum = dc.m_sta_count == "" ? 0 : parseInt(dc.m_sta_count, 10);
        bu.roamingStatus = aE(bu.networkType, dc.modem_main_state, dc.simcard_roam);
        bu.wifiStatus = dc.wifi_cur_state == "1";
        bu.simStatus = dc.modem_main_state;
        bu.pinStatus = dc.pin_status;
        var dd = 3 * 60 * 60;
        var db = (dc.battery_vol_percent && dc.battery_vol_percent.length > 0) ? dc.battery_vol_percent : 100;
        bu.batteryPers = dc.battery_pers;
        var de = Math.round(dd * (1 - db / 100));
        bu.batteryStatus = (typeof dc.battery_charging == "undefined") ? "0" : dc.battery_charging;
        bu.batteryLevel = db;
        bu.batteryTime = de.toString();
        bu.data_counter = {
            uploadRate: dc.realtime_tx_thrpt == "" ? 0 : dc.realtime_tx_thrpt,
            downloadRate: dc.realtime_rx_thrpt == "" ? 0 : dc.realtime_rx_thrpt,
            currentSent: dc.realtime_tx_bytes == "" ? 0 : dc.realtime_tx_bytes,
            currentReceived: dc.realtime_rx_bytes == "" ? 0 : dc.realtime_rx_bytes,
            currentConnectedTime: dc.realtime_time == "" ? 0 : dc.realtime_time,
            monthlySent: dc.monthly_tx_bytes == "" ? 0 : dc.monthly_tx_bytes,
            monthlyReceived: dc.monthly_rx_bytes == "" ? 0 : dc.monthly_rx_bytes,
            traffic_alined_delta: dc.traffic_alined_delta == "" ? 0 : dc.traffic_alined_delta,
            monthlyConnectedTime: dc.monthly_time == "" ? 0 : dc.monthly_time,
            month: dc.date_month == "" ? 1 : dc.date_month
        };
        bu.ssid = dc.SSID1;
        bu.authMode = dc.AuthMode;
        bu.isLoggedIn = aH.HAS_LOGIN ? dc.loginfo == "ok" : true;
        if (aH.HAS_SMS) {
            if (!bu.newSmsReceived) {
                bu.newSmsReceived = dc.sms_received_flag > 0
            }
            if (!bu.smsReportReceived) {
                bu.smsReportReceived = dc.sts_received_flag > 0
            }
            if (typeof dc.sms_dev_unread_num != "undefined") {
                bu.smsUnreadCount = aH.SMS_UNREAD_NUM_INCLUDE_SIM ? parseInt(dc.sms_dev_unread_num | 0, 10) + parseInt(dc.sms_sim_unread_num | 0, 10) : parseInt(dc.sms_dev_unread_num | 0, 10)
            } else {
                bu.smsUnreadCount = parseInt(dc.sms_unread_num | 0, 10)
            }
        }
        if (dc.data_volume_limit_switch == "1") {
            bu.limitVolumeEnable = true;
            bu.limitVolumeType = dc.data_volume_limit_unit == "data" ? "1" : "0";
            bu.limitVolumePercent = dc.data_volume_alert_percent;
            if (dc.data_volume_limit_unit == "data") {
                var df = dc.data_volume_limit_size.split("_");
                bu.limitVolumeSize = df[0] * df[1] * 1024 * 1024
            } else {
                bu.limitVolumeSize = dc.data_volume_limit_size * 60 * 60
            }
        } else {
            bu.limitVolumeEnable = false;
            bu.limitVolumeType = "1";
            bu.limitVolumePercent = "100";
            bu.limitVolumeSize = "0"
        }
        bu.connectWifiProfile = dc.EX_wifi_profile;
        bu.connectWifiSSID = dc.EX_SSID1;
        bu.connectWifiStatus = dc.sta_ip_status;
        bu.multi_ssid_enable = dc.m_ssid_enable;
        bu.roamMode = dc.roam_setting_option;
        if (dc.blc_wan_mode == "AUTO") {
            bu.blc_wan_mode = dc.blc_wan_auto_mode ? dc.blc_wan_auto_mode : "AUTO_PPP"
        } else {
            bu.blc_wan_mode = dc.blc_wan_mode ? dc.blc_wan_mode : "PPP"
        }
        bu.new_version_state = dc.fota_new_version_state == "has_critical" || dc.fota_new_version_state == "has_optional" || dc.fota_new_version_state == "already_has_pkg";
        bu.current_upgrade_state = dc.fota_current_upgrade_state;
        if (bu.current_upgrade_state == "verify_failed") {
            bu.current_upgrade_state = "upgrade_pack_error"
        }
        bu.fota_user_selector = dc.fota_upgrade_selector;
        bu.is_mandatory = dc.is_mandatory == "1" || dc.fota_new_version_state == "has_critical";
        bu.allowRoamingUpdate = dc.upg_roam_switch;
        bu.dialMode = dc.dial_mode;
        bu.fota_package_already_download = dc.fota_package_already_download
    }

    function cK() {
        bu.batteryStatus = "0"
    }

    function aE(dc, db, dd) {
        if (("" == cP.trim(dc)) || "no_service" == dc.toLowerCase() || "limited_service" == dc.toLowerCase() || "modem_sim_undetected" == db || "modem_waitpin" == db || "modem_waitpuk" == db) {
            return false
        }
        if ("Internal" == dd || "International" == dd) {
            return true
        } else {
            return false
        }
    }
    cP(document).ready(function() {
        setTimeout(function() {
            aU()
        }, 0)
    });

    function bm(dc, db, de, dg) {
        if ((typeof(dc) !== "string") || (dc === "") || (typeof(db) !== "number") || (isNaN(db))) {
            if (typeof(dg) === "function") {
                dg(false);
                return
            }
        }
        var df = -1;
        if (db === 0) {
            df = 0
        } else {
            if (db === 2) {
                df = 2
            } else {
                if (db == 7) {
                    df = 7
                } else {
                    df = -1
                }
            }
        }
        if (-1 === df) {
            if (typeof(dg) === "function") {
                dg(false);
                return
            }
        }
        var dd;
        if (de.toString() == "NaN") {
            dd = ""
        } else {
            dd = de
        }
        c7({
            goformId: "SET_NETWORK",
            NetworkNumber: dc,
            Rat: db,
            nSubrat: dd
        }, function(dj) {
            if (dj && dj.result == "success") {
                var di;
                var dh = 0;
                var dk = setInterval(function() {
                    var dl = cu({
                        cmd: "m_netselect_result"
                    }, false);
                    if (!dl) {
                        dg(false);
                        return
                    }
                    if (dl.m_netselect_result == "manual_success") {
                        di = "1";
                        window.clearInterval(dk);
                        dg(true)
                    } else {
                        if (dl.m_netselect_result == "manual_fail") {
                            di = "0";
                            window.clearInterval(dk);
                            dg(false)
                        } else {
                            if (dh < 120) {
                                dh++
                            } else {
                                window.clearInterval(dk);
                                dg(false)
                            }
                        }
                    }
                }, 1000)
            } else {
                dg(false)
            }
        }, function(dh) {
            dg(false)
        }, true)
    }

    function cH() {
        var de = arguments[1];
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df, dg) {
            var dh = {};
            dh.notCallback = true;
            dh.goformId = "PBM_CONTACT_ADD";
            dh.location = df.location;
            dh.name = encodeMessage(df.name);
            dh.mobilephone_num = df.mobile_phone_number;
            if (dh.location == 1) {
                dh.add_index_pc = df.index;
                dh.homephone_num = df.home_phone_number;
                dh.officephone_num = df.office_phone_number;
                dh.email = encodeMessage(df.mail);
                dh.groupchoose = df.group;
                if (!dh.groupchoose) {
                    dh.groupchoose = "common"
                }
            } else {
                dh.edit_index = df.index
            }
            if (df.delId != undefined) {
                dh.delId = df.delId
            }
            return dh
        }

        function dd(df) {
            if (df && df.result == "success") {
                bb("pbm_write_flag", db)
            } else {
                de(df)
            }
        }

        function db(df) {
            a0(df, de, db)
        }
    }

    function a0(db, dd, dc) {
        if (db.pbm_write_flag == "0") {
            m("pbm_write_flag", dc);
            dd({
                result: "success"
            })
        } else {
            if (db.pbm_write_flag == "6" || db.pbm_write_flag == "7" || db.pbm_write_flag == "8" || db.pbm_write_flag == "9" || db.pbm_write_flag == "10" || db.pbm_write_flag == "11" || db.pbm_write_flag == "14") {
                m("pbm_write_flag", dc);
                dd({
                    result: "fail"
                })
            } else {}
        }
    }

    function bl() {
        var de = arguments[1];
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df, dg) {
            var dh = {};
            dh.notCallback = true;
            dh.goformId = "PBM_CONTACT_DEL";
            dh.del_option = "delete_num";
            dh.delete_id = df.indexs.join(",");
            return dh
        }

        function dd(df) {
            if (df && df.result == "success") {
                bb("pbm_write_flag", db)
            } else {
                de(df)
            }
        }

        function db(df) {
            a0(df, de, db)
        }
    }

    function aV() {
        var de = arguments[1];
        return bz(arguments, {}, db, dd, null, true);

        function db(df, dg) {
            var dh = {};
            dh.notCallback = true;
            dh.goformId = "PBM_CONTACT_DEL";
            dh.del_option = "delete_all";
            dh.del_all_location = df.location;
            return dh
        }

        function dd(df) {
            if (df && df.result == "success") {
                bb("pbm_write_flag", dc)
            } else {
                de(df)
            }
        }

        function dc(df) {
            a0(df, de, dc)
        }
    }

    function Z() {
        var de = arguments[1];
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df, dg) {
            var dh = {};
            dh.notCallback = true;
            dh.goformId = "PBM_CONTACT_DEL";
            dh.del_option = "delete_all_by_group";
            dh.del_all_location = 3;
            dh.del_group = df.group;
            return dh
        }

        function dd(df) {
            if (df && df.result == "success") {
                bb("pbm_write_flag", db)
            } else {
                de(df)
            }
        }

        function db(df) {
            a0(df, de, db)
        }
    }

    function af() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_CONNECTION_MODE";
            df.ConnectionMode = dd.connectionMode;
            df.roam_setting_option = dd.isAllowedRoaming;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                callback(dd)
            }
        }
    }

    function K() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "ConnectionMode";
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.connectionMode = de.connectionMode;
                dd.isAllowedRoaming = de.autoConnectWhenRoaming;
                return dd
            } else {
                return V
            }
        }
    }

    function a(de, db) {
        if (de[0].data_per_page == 0) {
            return {
                pbm_data: []
            }
        }
        return bz(de, {}, dc, dd, null, false);

        function dc(df, dg) {
            var dh = {};
            dh.mem_store = db;
            if (db == 2) {
                dh.cmd = "pbm_data_total"
            } else {
                dh.cmd = "pbm_data_info"
            }
            dh.page = df.page;
            dh.data_per_page = df.data_per_page;
            dh.orderBy = df.orderBy;
            dh.isAsc = df.isAsc;
            return dh
        }

        function dd(df) {
            if (df && df.pbm_data) {
                var dg = [];
                cP.each(df.pbm_data, function(dh) {
                    dg.push({
                        pbm_id: df.pbm_data[dh].pbm_id,
                        pbm_location: df.pbm_data[dh].pbm_location,
                        pbm_number: df.pbm_data[dh].pbm_number,
                        pbm_anr: df.pbm_data[dh].pbm_anr,
                        pbm_anr1: df.pbm_data[dh].pbm_anr1,
                        pbm_group: df.pbm_data[dh].pbm_group,
                        pbm_name: decodeMessage(df.pbm_data[dh].pbm_name),
                        pbm_email: decodeMessage(df.pbm_data[dh].pbm_email)
                    })
                });
                return {
                    pbm_data: dg
                }
            } else {
                return V
            }
        }
    }

    function bV() {
        if (arguments[0].data_per_page == 0) {
            return {
                pbm_data: []
            }
        }
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "pbm_data_total";
            df.mem_store = 3;
            df.pbm_group = dd.group;
            df.page = dd.page;
            df.data_per_page = dd.data_per_page;
            df.orderBy = dd.orderBy;
            df.isAsc = dd.isAsc;
            return df
        }

        function dc(dd) {
            if (dd && dd.pbm_data) {
                var de = [];
                cP.each(dd.pbm_data, function(df) {
                    de.push({
                        pbm_id: dd.pbm_data[df].pbm_id,
                        pbm_location: dd.pbm_data[df].pbm_location,
                        pbm_number: dd.pbm_data[df].pbm_number,
                        pbm_anr: dd.pbm_data[df].pbm_anr,
                        pbm_anr1: dd.pbm_data[df].pbm_anr1,
                        pbm_group: dd.pbm_data[df].pbm_group,
                        pbm_name: decodeMessage(dd.pbm_data[df].pbm_name),
                        pbm_email: decodeMessage(dd.pbm_data[df].pbm_email)
                    })
                });
                return {
                    pbm_data: de
                }
            } else {
                return V
            }
        }
    }

    function c5() {
        return a(arguments, 1)
    }

    function cI() {
        return a(arguments, 0)
    }

    function S() {
        return a(arguments, 2)
    }

    function ch() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "pbm_init_flag";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ce(de, dd) {
        return bz(de, {}, db, dc, null, false);

        function db(df, dg) {
            var dh = {};
            dh.cmd = "pbm_capacity_info";
            if (dd) {
                dh.pbm_location = "pbm_sim"
            } else {
                dh.pbm_location = "pbm_native"
            }
            return dh
        }

        function dc(df) {
            if (df) {
                return df
            } else {
                return V
            }
        }
    }

    function bQ() {
        var db = ce(arguments, true);
        return {
            simPbmTotalCapacity: parseInt(db.pbm_sim_max_record_num),
            simPbmUsedCapacity: parseInt(db.pbm_sim_used_record_num),
            simType: db.pbm_sim_type,
            maxNameLen: parseInt(db.pbm_sim_max_name_len),
            maxNumberLen: parseInt(db.pbm_sim_max_number_len) > 40 ? 40 : parseInt(db.pbm_sim_max_number_len)
        }
    }

    function ag() {
        var db = ce(arguments, false);
        return {
            pcPbmTotalCapacity: parseInt(db.pbm_dev_max_record_num),
            pcPbmUsedCapacity: parseInt(db.pbm_dev_used_record_num)
        }
    }

    function bF() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "lan_station_list"
            };
            return df
        }

        function dc(dd) {
            var dg = [];
            var dh = dd.lan_station_list || dd.station_list;
            for (var df = 0; dh && df < dh.length; df++) {
                var di = {};
                di.macAddress = dh[df].mac_addr;
                var de = dh[df].hostname;
                di.hostName = de == "" ? cP.i18n.prop("unknown") : de;
                di.ipAddress = dh[df].ip_addr;
                dg.push(di)
            }
            return {
                attachedDevices: dg
            }
        }
    }

    function bq() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "station_list"
            };
            return df
        }

        function dc(dd) {
            var dg = [];
            var dh = dd.station_list;
            for (var df = 0; dh && df < dh.length; df++) {
                var di = {};
                di.macAddress = dh[df].mac_addr;
                var de = dh[df].hostname;
                di.hostName = de == "" ? cP.i18n.prop("unknown") : de;
                di.ipAddress = dh[df].ip_addr;
                dg.push(di)
            }
            return {
                attachedDevices: dg
            }
        }
    }

    function k() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_WEB_LANGUAGE";
            df.Language = dd.Language;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function A() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "Language";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.Language = (de && de.Language) ? de.Language : "en";
                return dd
            } else {
                return V
            }
        }
    }

    function bJ() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_BEARER_PREFERENCE";
            df.BearerPreference = dd.strBearerPreference;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aF(dd) {
        cP.post("/reqproc/proc_post", {
            goformId: "SCAN_NETWORK"
        }, function(de) {
            if (de.result == "success") {
                db()
            } else {
                dd(false, [])
            }
        }, "json").error(function() {
            dd(false, [])
        });

        function db() {
            cP.getJSON("/reqproc/proc_get", {
                cmd: "m_netselect_status",
                _: new Date().getTime()
            }, function(de) {
                if (de.m_netselect_status == "manual_selecting") {
                    setTimeout(db, 1000)
                } else {
                    cP.getJSON("/reqproc/proc_get", {
                        cmd: "m_netselect_contents",
                        _: new Date().getTime()
                    }, function(df) {
                        if (trim(df.m_netselect_contents) != "") {
                            dc(df.m_netselect_contents)
                        } else {
                            dd(false, [])
                        }
                    }).error(function() {
                        dd(false, [])
                    })
                }
            }).error(function() {
                dd(false, [])
            })
        }

        function dc(de) {
            var di = /([^,;]*),([^,]*),([^,]*),([^,]*),([^,;]*)/g;
            var dj = [];
            var dk;
            var dh = de.split(";");
            var df = "";
            for (i = 0; i < dh.length; i++) {
                var dg = dh[i].split(",").length;
                if (dg == 4) {
                    df += dh[i] + ",NON;"
                } else {
                    df += dh[i] + ";"
                }
            }
            while (dk = di.exec(df)) {
                if (dk != null) {
                    dj.push({
                        strShortName: dk[2].replace(/\"/g, ""),
                        strNumeric: dk[3].replace(/\D/g, ""),
                        nRat: parseInt(dk[4], 10),
                        nState: parseInt(dk[1], 10),
                        SubAct: parseInt(dk[5], 10)
                    })
                }
            }
            dd(true, dj)
        }
    }

    function Q() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.current_network_mode = de.current_network_mode;
                dd.net_select_mode = de.net_select_mode;
                dd.m_netselect_save = de.m_netselect_save;
                dd.m_netselect_contents = de.m_netselect_contents;
                dd.net_select = de.net_select;
                dd.ppp_status = de.ppp_status;
                dd.modem_main_state = de.modem_main_state;
                return dd
            } else {
                return V
            }
        }
    }

    function aL() {
        return bz(arguments, {}, db, dc, {}, false);

        function db(dd, de) {
            var df = {
                cmd: "sms_data_total",
                page: dd.page,
                data_per_page: aH.SMS_DATABASE_SORT_SUPPORT ? dd.smsCount : 500,
                mem_store: dd.nMessageStoreType,
                tags: dd.tags,
                order_by: dd.orderBy
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.messages && dd.messages.length > 0) {
                return {
                    messages: cL(dd.messages)
                }
            } else {
                return {
                    messages: []
                }
            }
        }
    }

    function cL(dd, di) {
        var dj = [];
        for (var de = 0; de < dd.length; de++) {
            if (!aH.SHOW_UN_COMPLETE_CONCAT_SMS && typeof dd[de].received_all_concat_sms != "undefined" && dd[de].received_all_concat_sms == "0") {
                continue
            }
            var dg = {};
            dg.id = dd[de].id;
            dg.number = dd[de].number;
            dg.content = di ? dd[de].content : aX(dd[de].content);
            dg.time = transTime("20" + dd[de].date);
            dg.isNew = dd[de].tag == "1";
            dg.groupId = dd[de].draft_group_id;
            dg.tag = dd[de].tag;
            dg.receivedAll = dd[de].received_all_concat_sms == "1";
            dj.push(dg)
        }
        if (!aH.SMS_DATABASE_SORT_SUPPORT) {
            var db = [];
            var df = [];
            for (var de = dj.length; de--;) {
                var dc = dj[de];
                var dh = cP.inArray(dc.id, db);
                if (dh == -1) {
                    db.push(dc.id);
                    df.push(dc)
                } else {
                    if (dc.content.length > df[dh].content.length) {
                        df[dh] = dc
                    }
                }
            }
            return cg.sortBy(df, function(dk) {
                return 0 - dk.id
            })
        } else {
            return dj
        }
    }

    function aX(db) {
        return decodeMessage(escapeMessage(db))
    }

    function aZ() {
        var de = arguments[1];
        var dc = arguments[2] ? arguments[2] : de;
        return bz(arguments, {}, db, dd, null, true);

        function db(df, dg) {
            var dh = {
                goformId: "SEND_SMS",
                notCallback: true,
                Number: df.number,
                sms_time: getCurrentTimeString(),
                MessageBody: escapeMessage(encodeMessage(df.message)),
                ID: df.id,
                encode_type: getEncodeType(df.message).encodeType
            };
            return dh
        }

        function dd(df) {
            if (!df) {
                dc(cP.extend(V, {
                    errorType: "sendFail",
                    errorText: "send_fail_try_again"
                }));
                return
            }
            if (df.result == "success") {
                setTimeout(function() {
                    cM({
                        smsCmd: 4,
                        errorType: "sendFail",
                        errorText: "send_fail_try_again"
                    }, de, dc)
                }, 1000)
            } else {
                dc(cP.extend(V, {
                    errorType: "sendFail",
                    errorText: "send_fail_try_again"
                }))
            }
        }
    }

    function aI() {
        var de = arguments[1];
        var dc = arguments[2] ? arguments[2] : de;
        return bz(arguments, {}, db, dd, null, true);

        function db(df, dg) {
            var dh = {
                notCallback: true,
                goformId: "SAVE_SMS",
                SMSMessage: escapeMessage(encodeMessage(df.message)),
                SMSNumber: df.numbers.join(";") + ";",
                Index: df.index,
                encode_type: getEncodeType(df.message).encodeType,
                sms_time: df.currentTimeString,
                draft_group_id: df.groupId
            };
            return dh
        }

        function dd(df) {
            if (!df) {
                dc(cP.extend(V, {
                    errorType: "saveFail",
                    errorText: "save_fail"
                }));
                return
            }
            if (df.result == "success") {
                cM({
                    smsCmd: 5,
                    errorType: "saveFail",
                    errorText: "save_fail"
                }, de, dc)
            } else {
                dc(cP.extend(V, {
                    errorType: "saveFail",
                    errorText: "save_fail"
                }))
            }
        }
    }

    function bU() {
        var df = arguments[1];
        var dd = arguments[2] ? arguments[2] : df;
        return bz(arguments, {}, dc, de, null, true);

        function dc(dg, dh) {
            var di = {
                goformId: "ALL_DELETE_SMS",
                notCallback: true,
                which_cgi: dg.location
            };
            return di
        }

        function de(dg) {
            if (!dg) {
                dd(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }));
                return
            }
            if (dg.result == "success") {
                bb("sms_cmd_status_info", db)
            } else {
                dd(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }

        function db(dh) {
            var dg = dh.sms_cmd_status_info;
            if (dg == "2") {
                m("sms_cmd_status_info", db);
                dd(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            } else {
                if (dg == "3") {
                    m("sms_cmd_status_info", db);
                    df({
                        result: true
                    })
                }
            }
        }
    }

    function cA() {
        var de = arguments[1];
        var dc = arguments[2] ? arguments[2] : de;
        return bz(arguments, {}, db, dd, null, true);

        function db(dg, dh) {
            var df = dg.ids.join(";") + ";";
            var di = {
                goformId: "DELETE_SMS",
                msg_id: df,
                notCallback: true
            };
            return di
        }

        function dd(df) {
            if (!df) {
                dc(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }));
                return
            }
            if (df.result == "success") {
                cM({
                    smsCmd: 6,
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }, de, dc)
            } else {
                dc(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }
    }

    function cM(dc, dd, db) {
        c7({
            cmd: "sms_cmd_status_info",
            sms_cmd: dc.smsCmd
        }, function(df) {
            if (df) {
                var de = df.sms_cmd_status_result;
                if (de == "2") {
                    db(cP.extend(V, {
                        errorType: dc.errorType,
                        errorText: dc.errorText
                    }))
                } else {
                    if (de == "3") {
                        dd({
                            result: "success"
                        })
                    } else {
                        window.setTimeout(function() {
                            cM(dc, dd, db)
                        }, 1000)
                    }
                }
            } else {
                db(cP.extend(V, {
                    errorType: dc.errorType,
                    errorText: dc.errorText
                }))
            }
        }, function(de) {
            db(cP.extend(V, {
                errorType: dc.errorType,
                errorText: dc.errorText
            }))
        }, false)
    }

    function aJ() {
        if (aH.smsIsReady) {
            var dd = arguments[1];
            if (dd) {
                return dd({
                    sms_cmd: "1",
                    sms_cmd_status_result: "3"
                })
            } else {
                return {
                    sms_cmd: "1",
                    sms_cmd_status_result: "3"
                }
            }
        } else {
            return bz(arguments, {}, db, dc, null, false)
        }

        function db(de, df) {
            var dg = {};
            dg.cmd = "sms_cmd_status_info";
            dg.sms_cmd = 1;
            return dg
        }

        function dc(de) {
            if (de) {
                if (de.sms_cmd_status_result == "3") {
                    aH.smsIsReady = true
                }
                return de
            } else {
                return V
            }
        }
    }

    function ae() {
        return bz(arguments, {}, db, dc, null, true);

        function db(de, df) {
            var dd = de.ids.join(";");
            if (de.ids.length > 0) {
                dd += ";"
            }
            var dg = {
                goformId: "SET_MSG_READ",
                msg_id: dd,
                tag: 0
            };
            return dg
        }

        function dc(dd) {
            if (dd.result == "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function L() {
        return bz(arguments, {}, db, dc, {}, false);

        function db(dd, de) {
            var df = {
                cmd: "sms_status_rpt_data",
                page: dd.page,
                data_per_page: dd.smsCount
            };
            return df
        }

        function dc(dd) {
            if (dd) {
                return {
                    messages: cL(dd.messages, true)
                }
            } else {
                return V
            }
        }
    }

    function bt() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = cP.extend({}, dd);
            df.goformId = "LOGOUT";
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                bu.isLoggedIn = false;
                return {
                    result: true
                }
            } else {
                return cP.extend(V, {
                    errorType: "loggedOutError"
                })
            }
        }
    }

    function bX() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.newPassword = aH.PASSWORD_ENCODE ? Base64.encode(dd.newValue) : dd.newValue;
            df.oldPassword = aH.PASSWORD_ENCODE ? Base64.encode(dd.oldValue) : dd.oldValue;
            df.goformId = "CHANGE_PASSWORD";
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return cP.extend(V, {
                    errorType: "badPassword"
                })
            }
        }
    }

    function cF() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "imei,time_to_live";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.imei = de.imei;
                dd.time_to_live = de.time_to_live;
                return dd
            } else {
                return V
            }
        }
    }

    function bD() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ALK_WRITE_IMEI";
            df.imei_string = dd.imei_string;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function br() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ALK_WRITE_TTL";
            df.ttl_value = dd.ttl_value;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function av() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "midnight_reboot_switch";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function c0() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "midnight_reboot_hour";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cT() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "network_detect_switch";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function b9() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ALK_NETDET_SWITCH";
            df.network_detect_switch = dd.network_detect_switch;
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cq() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ALK_REBOOT_SWITCH";
            df.midnight_reboot_switch = dd.midnight_reboot_switch;
            df.midnight_reboot_hour = dd.midnight_reboot_hour;
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cZ() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "pinnumber,pin_status,puknumber";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function da() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ENABLE_PIN";
            df.OldPinNumber = dd.oldPin;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function b0() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "DISABLE_PIN";
            df.OldPinNumber = dd.oldPin;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function o() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ENABLE_PIN";
            df.OldPinNumber = dd.oldPin;
            df.NewPinNumber = dd.newPin;
            return df
        }

        function dc(dd) {
            if (dd && dd.result === "success") {
                return {
                    result: true
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function bs() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour,lan_dns_mode,lan_dns_ip";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.ipAddress = de.lan_ipaddr;
                dd.subnetMask = de.lan_netmask;
                dd.macAddress = de.mac_address;
                dd.dhcpServer = de.dhcpEnabled;
                dd.dhcpStart = de.dhcpStart;
                dd.dhcpEnd = de.dhcpEnd;
                dd.dhcpLease = parseInt(de.dhcpLease_hour, 10);
                dd.lan_dns_mode = de.lan_dns_mode;
                dd.lan_dns_ip = de.lan_dns_ip;
                return dd
            } else {
                return V
            }
        }
    }

    function cd() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "DHCP_SETTING";
            df.lanIp = dd.ipAddress;
            df.lanNetmask = dd.subnetMask;
            df.lanDhcpType = dd.dhcpServer == "1" ? "SERVER" : "DISABLE";
            if (df.lanDhcpType == "SERVER") {
                df.dhcpStart = dd.dhcpStart;
                df.dhcpEnd = dd.dhcpEnd;
                df.dhcpLease = dd.dhcpLease
            }
            df.dhcp_reboot_flag = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function b1() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "sms_parameter_info";
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.centerNumber = de.sms_para_sca;
                dd.memStroe = de.sms_para_mem_store;
                dd.deliveryReport = de.sms_para_status_report;
                switch (parseInt(de.sms_para_validity_period, 10)) {
                    case 143:
                        dd.validity = "twelve_hours";
                        break;
                    case 167:
                        dd.validity = "one_day";
                        break;
                    case 173:
                        dd.validity = "one_week";
                        break;
                    case 244:
                        dd.validity = "largest";
                        break;
                    case 255:
                        dd.validity = "largest";
                        break;
                    default:
                        dd.validity = "twelve_hours";
                        break
                }
                return dd
            } else {
                return V
            }
        }
    }

    function aQ() {
        var de = arguments[1];
        var dc = arguments[2] ? arguments[2] : de;
        return bz(arguments, {}, db, dd, null, true);

        function db(df, dg) {
            var dh = {};
            dh.goformId = "SET_MESSAGE_CENTER";
            dh.save_time = df.validity;
            dh.MessageCenter = df.centerNumber;
            dh.status_save = df.deliveryReport;
            dh.save_location = "native";
            dh.notCallback = true;
            return dh
        }

        function dd(df) {
            if (!df) {
                dc(cP.extend(V, {
                    errorType: "smsSettingFail",
                    errorText: "error_info"
                }));
                return
            }
            if (df.result == "success") {
                cM({
                    smsCmd: 3,
                    errorType: "smsSettingFail",
                    errorText: "error_info"
                }, de, dc)
            } else {
                dc(cP.extend(V, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }
    }

    function ay() {
        var dc = {};
        if (aH.HAS_PARENTAL_CONTROL && aH.currentUserInChildGroup != false) {
            dc = {
                errorType: "no_auth"
            }
        }
        return bz(arguments, dc, db, dd, null, true);

        function db(de, df) {
            var dg = {};
            dg.goformId = "RESTORE_FACTORY_SETTINGS";
            return dg
        }

        function dd(de) {
            if (de) {
                return de
            } else {
                return V
            }
        }
    }

    function ab(db) {
        var dc = {};
        dc.cmd = "restore_flag";
        dc.multi_data = 1;
        c7(dc, function(dd) {
            if (dd && dd.restore_flag === "1") {
                db()
            } else {
                setTimeout(function() {
                    ab(db)
                }, 5000)
            }
        }, function() {
            setTimeout(function() {
                ab(db)
            }, 5000)
        }, false)
    }

    function cc() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "wifi_wps_index,WscModeOption,AuthMode,wifi_cur_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode,wifi_sta_connection";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.wpsFlag = de.WscModeOption;
                dd.authMode = de.AuthMode;
                dd.wpsType = de.wps_mode;
                dd.radioFlag = de.wifi_cur_state == "1" ? "1" : "0";
                dd.encrypType = de.EncrypType;
                dd.wpsSSID = de.WPS_SSID;
                dd.ssidEnable = de.m_ssid_enable;
                dd.ssid = de.SSID1;
                dd.multiSSID = de.m_SSID;
                dd.m_encrypType = de.m_EncrypType;
                dd.wifi_wps_index = de.wifi_wps_index;
                dd.AuthMode = de.AuthMode;
                dd.m_AuthMode = de.m_AuthMode;
                dd.ap_station_enable = de.wifi_sta_connection;
                return dd
            } else {
                return V
            }
        }
    }

    function r() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "WIFI_WPS_SET";
            df.WPS_SSID = dd.wpsSSID;
            df.wps_mode = dd.wpsType;
            df.wifi_wps_index = dd.wpsIndex;
            if (df.wps_mode == "PIN") {
                df.wps_pin = dd.wpsPin
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ac() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "WIFI_M_WPS_SET";
            df.m_WPS_SSID = dd.wpsSSID;
            df.m_wps_mode = dd.wpsType;
            df.m_wifi_wps_index = dd.wpsIndex;
            if (df.m_wps_mode == "PIN") {
                df.m_wps_pin = dd.wpsPin
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ck() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "Sleep_interval";
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.sleepMode = de.Sleep_interval;
                return dd
            } else {
                return V
            }
        }
    }

    function bf() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_WIFI_SLEEP_INFO";
            df.sysIdleTimeToSleep = dd.sleepMode;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bW() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "RemoteManagement,WANPingFilter";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.remoteFlag = de.RemoteManagement == "1" ? "1" : "0";
                dd.pingFlag = de.WANPingFilter == "1" ? "1" : "0";
                return dd
            } else {
                return V
            }
        }
    }

    function cE() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "FW_SYS";
            df.remoteManagementEnabled = dd.remoteFlag;
            df.pingFrmWANFilterEnabled = dd.pingFlag;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function D() {
        return bz(arguments, {}, db, dd, null, false);

        function db(de, df) {
            var dg = {};
            dg.cmd = "PortForwardEnable,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9";
            dg.multi_data = 1;
            return dg
        }

        function dd(df) {
            if (df) {
                var de = {};
                de.portForwardEnable = df.PortForwardEnable;
                var dg = [];
                if (df.PortForwardRules_0 != "") {
                    dg.push([0, df.PortForwardRules_0])
                }
                if (df.PortForwardRules_1 != "") {
                    dg.push([1, df.PortForwardRules_1])
                }
                if (df.PortForwardRules_2 != "") {
                    dg.push([2, df.PortForwardRules_2])
                }
                if (df.PortForwardRules_3 != "") {
                    dg.push([3, df.PortForwardRules_3])
                }
                if (df.PortForwardRules_4 != "") {
                    dg.push([4, df.PortForwardRules_4])
                }
                if (df.PortForwardRules_5 != "") {
                    dg.push([5, df.PortForwardRules_5])
                }
                if (df.PortForwardRules_6 != "") {
                    dg.push([6, df.PortForwardRules_6])
                }
                if (df.PortForwardRules_7 != "") {
                    dg.push([7, df.PortForwardRules_7])
                }
                if (df.PortForwardRules_8 != "") {
                    dg.push([8, df.PortForwardRules_8])
                }
                if (df.PortForwardRules_9 != "") {
                    dg.push([9, df.PortForwardRules_9])
                }
                de.portForwardRules = dc(dg);
                return de
            } else {
                return V
            }
        }

        function dc(de) {
            var di = [];
            if (de && de.length > 0) {
                for (var dg = 0; dg < de.length; dg++) {
                    var df = {};
                    var dh = de[dg][1].split(",");
                    df.index = de[dg][0];
                    df.ipAddress = dh[0];
                    df.portRange = dh[1] + " - " + dh[2];
                    df.protocol = transProtocol(dh[3]);
                    df.comment = dh[4];
                    di.push(df)
                }
            }
            return di
        }
    }

    function ap() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "FW_FORWARD_ADD";
            df.ipAddress = dd.ipAddress;
            df.portStart = dd.portStart;
            df.portEnd = dd.portEnd;
            df.protocol = dd.protocol;
            df.comment = dd.comment;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cD() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "FW_FORWARD_DEL";
            df.delete_id = dd.indexs.join(";") + ";";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aD() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "VIRTUAL_SERVER";
            df.PortForwardEnable = dd.portForwardEnable;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function c(dg, df, db) {
        var de = dg + df + "FFFFFFFFFFFFFFFFFFFFFFFF";
        var di;
        var dh;
        di = de.substring(0, 24);
        dh = de.substring(0, 16);
        var dd = bv.enc.Latin1.parse(di);
        var dc = bv.enc.Latin1.parse(dh);
        var dj = bv.AES.decrypt(db, dd, {
            iv: dc,
            mode: bv.mode.CBC,
            padding: bv.pad.ZeroPadding
        }).toString(bv.enc.Utf8);
        return dj
    }

    function a4() {
        return bz(arguments, {}, db, dc, null, false);

        function db(de, df) {
            var dg = {};
            var dd = aH.PASSWORD_ENCODE ? ",WPAPSK1_encode" : ",imei,rnum_js,WPAPSK1_enaes";
            dg.cmd = "pdp_type,ipv6_pdp_type,wifi_cur_state,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode,EncrypType,DefaultKeyID,Key1Str1,Key2Str1,Key3Str1,Key4Str1" + dd + ",APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19";
            dg.multi_data = 1;
            return dg
        }

        function dc(dd) {
            if (dd) {
                if (aH.PASSWORD_ENCODE) {
                    dd.WPAPSK1 = Base64.decode(dd.WPAPSK1_encode)
                } else {
                    dd.WPAPSK1 = c(dd.rnum_js, dd.imei, dd.WPAPSK1_enaes)
                }
                return dd
            } else {
                return V
            }
        }
    }

    function c6() {
        ax(arguments, db, dc);

        function db(dd) {
            var de = {
                goformId: "QUICK_SETUP_EX",
                index: dd.apn_index,
                pdp_type: dd.pdp_type,
                apn_mode: dd.apnMode,
                profile_name: dd.profile_name,
                wan_apn: dd.wan_apn,
                ppp_auth_mode: dd.ppp_auth_mode,
                ppp_username: dd.ppp_username,
                ppp_passtmp: dd.ppp_passtmp,
                ipv6_wan_apn: dd.ipv6_wan_apn,
                ipv6_ppp_auth_mode: dd.ipv6_ppp_auth_mode,
                ipv6_ppp_username: dd.ipv6_ppp_username,
                ipv6_ppp_passtmp: dd.ipv6_ppp_passtmp,
                SSID_name: dd.SSID_name,
                SSID_Broadcast: dd.SSID_Broadcast,
                Encryption_Mode_hid: dd.Encryption_Mode_hid,
                security_shared_mode: dd.security_shared_mode,
                WPA_PreShared_Key: aH.PASSWORD_ENCODE ? Base64.encode(dd.WPA_PreShared_Key) : dd.WPA_PreShared_Key,
                wep_default_key: dd.wep_default_key,
                WPA_ENCRYPTION_hid: dd.WPA_ENCRYPTION_hid
            };
            de.wep_key_1 = dd.wep_key_1;
            de.wep_key_2 = dd.wep_key_2;
            de.wep_key_3 = dd.wep_key_3;
            de.wep_key_4 = dd.wep_key_4;
            if (dd.wep_default_key == "1") {
                de.WEP2Select = dd.WEP2Select
            } else {
                if (dd.wep_default_key == "2") {
                    de.WEP3Select = dd.WEP3Select
                } else {
                    if (dd.wep_default_key == "3") {
                        de.WEP4Select = dd.WEP4Select
                    } else {
                        de.WEP1Select = dd.WEP1Select
                    }
                }
            }
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return cP.extend(V, {
                    errorType: "SetSetUpError"
                })
            }
        }
    }

    function ax(dk, df, dd) {
        var dj = false;
        var db = false;
        var dh = df(dk[0]);
        var di = dk[1];
        var dc = function(dl) {
            dj = true;
            if (!db && di) {
                di(dd(dl))
            }
            db = true
        };
        var dg = dk[2];
        var de = function() {
            dj = true;
            if (dg) {
                dg()
            }
        };
        c7(dh, dc, de, true);
        addTimeout(function() {
            if (dj == false) {
                var dl = addInterval(function() {
                    if (dj == false) {
                        A({}, function(dm) {
                            window.clearInterval(dl);
                            dc({
                                result: "success"
                            })
                        })
                    }
                }, 1000)
            }
        }, 5000)
    }

    function bS() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
                multi_data: 1
            };
            return df
        }

        function dc(de) {
            if (de) {
                var df;
                if ("mmc2" == de.HTTP_SHARE_FILE || "/mmc2" == de.HTTP_SHARE_FILE || "/mmc2/" == de.HTTP_SHARE_FILE) {
                    df = "1"
                } else {
                    df = "0"
                }
                var dd = {
                    sd_mode: de.sdcard_mode_option == "1" ? "0" : "1",
                    sd_status: de.sd_card_state,
                    share_status: de.HTTP_SHARE_STATUS == "Enabled" ? "1" : "0",
                    share_auth: de.HTTP_SHARE_WR_AUTH == "readOnly" ? "0" : "1",
                    file_to_share: df,
                    share_file: de.HTTP_SHARE_FILE
                };
                return dd
            } else {
                return V
            }
        }
    }

    function cw() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "HTTPSHARE_MODE_SET",
                mode_set: dd.mode == "0" ? "http_share_mode" : "usb_mode"
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return {
                    result: "success"
                }
            } else {
                if (dd && dd.result == "processing") {
                    return {
                        result: "processing"
                    }
                } else {
                    return {
                        result: false
                    }
                }
            }
        }
    }

    function M() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "GOFORM_HTTPSHARE_CHECK_FILE",
                path_SD_CARD: dd.path
            };
            return df
        }

        function dc(dd) {
            if (dd) {
                if (dd.result == "no_sdcard") {
                    return {
                        status: "no_sdcard"
                    }
                } else {
                    if (dd.result == "noexist") {
                        return {
                            status: "noexist"
                        }
                    } else {
                        if (dd.result == "processing") {
                            return {
                                status: "processing"
                            }
                        } else {
                            return {
                                status: "exist"
                            }
                        }
                    }
                }
            } else {
                return V
            }
        }
    }

    function ad() {
        return bz(arguments, {}, db, dd, null, true);

        function db(de, df) {
            var dg = {
                goformId: "HTTPSHARE_ENTERFOLD",
                path_SD_CARD: de.path,
                indexPage: de.index
            };
            return dg
        }

        function dd(de) {
            if (de) {
                if (de.result == "failure") {
                    return cP.extend(V, {
                        errorType: "get_file_list_failure"
                    })
                } else {
                    if (de.result == "no_sdcard") {
                        return cP.extend(V, {
                            errorType: "no_sdcard"
                        })
                    } else {
                        return dc(de.result)
                    }
                }
            } else {
                return V
            }
        }

        function dc(de) {
            var dh = {};
            dh.totalRecord = de.totalRecord;
            var dj = [];
            var dg = de.fileInfo;
            for (var df = 0; dg && df < dg.length; df++) {
                if (dg[df].fileName == "") {
                    continue
                }
                var di = {};
                di.fileName = dg[df].fileName;
                di.attribute = dg[df].attribute;
                di.size = dg[df].size;
                di.lastUpdateTime = dg[df].lastUpdateTime;
                dj.push(di)
            }
            dh.details = dj;
            return dh
        }
    }

    function bC() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var dg = new Date();
            var df = dg.getTime();
            var dh = dg.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_FILE_RENAME",
                path_SD_CARD: dd.path,
                OLD_NAME_SD_CARD: dd.oldPath,
                NEW_NAME_SD_CARD: dd.newPath,
                path_SD_CARD_time: transUnixTime(df),
                path_SD_CARD_time_unix: Math.round((df - dh * 1000) / 1000)
            }
        }

        function dc(dd) {
            if (dd) {
                if (dd.result == "success") {
                    return {
                        result: true
                    }
                } else {
                    if (dd.result == "no_sdcard") {
                        return cP.extend(V, {
                            errorType: "no_sdcard"
                        })
                    } else {
                        if (dd.result == "noexist") {
                            return cP.extend(V, {
                                errorType: "no_exist"
                            })
                        } else {
                            if (dd.result == "processing") {
                                return cP.extend(V, {
                                    errorType: "sd_file_processing_cant_rename"
                                })
                            } else {
                                return {
                                    result: false
                                }
                            }
                        }
                    }
                }
            } else {
                return V
            }
        }
    }

    function B() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "HTTPSHARE_GETCARD_VALUE"
            };
            return df
        }

        function dc(dd) {
            if (!dd || (dd.result && dd.result == "no_sdcard")) {
                return cP.extend(V, {
                    errorType: "no_sdcard"
                })
            } else {
                return {
                    totalMemorySize: dd.sd_card_total_size == "" ? 0 : dd.sd_card_total_size * 32 * 1024,
                    availableMemorySize: dd.sd_card_avi_space == "" ? 0 : dd.sd_card_avi_space * 32 * 1024
                }
            }
        }
    }

    function aW() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = new Date().getTime();
            var dg = {
                goformId: "HTTPSHARE_DEL",
                path_SD_CARD: dd.path,
                name_SD_CARD: dd.names,
                path_SD_CARD_time: transUnixTime(df),
                path_SD_CARD_time_unix: Math.round(df / 1000)
            };
            return dg
        }

        function dc(dd) {
            if (dd.result && dd.result == "failure") {
                return {
                    status: "failure"
                }
            } else {
                if (dd.result && dd.result == "no_sdcard") {
                    return {
                        status: "no_sdcard"
                    }
                } else {
                    if (dd.result && dd.result == "processing") {
                        return {
                            status: "processing"
                        }
                    } else {
                        if (dd.result && dd.result == "success") {
                            return {
                                status: "success"
                            }
                        } else {
                            return V
                        }
                    }
                }
            }
        }
    }

    function H() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var dg = new Date();
            var df = dg.getTime();
            var dh = dg.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_NEW",
                path_SD_CARD: dd.path,
                path_SD_CARD_time: transUnixTime(df),
                path_SD_CARD_time_unix: Math.round((df - dh * 1000) / 1000)
            }
        }

        function dc(dd) {
            if (dd.result && dd.result == "failure") {
                return cP.extend(V, {
                    errorType: "create_folder_failure"
                })
            } else {
                if (dd.result && dd.result == "no_sdcard") {
                    return cP.extend(V, {
                        errorType: "no_sdcard"
                    })
                } else {
                    if (dd.result && dd.result == "success") {
                        return {
                            result: true
                        }
                    } else {
                        return V
                    }
                }
            }
        }
    }

    function cb() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "HTTPSHARE_AUTH_SET",
                HTTP_SHARE_STATUS: dd.share_status == "1" ? "Enabled" : "Disabled",
                HTTP_SHARE_WR_AUTH: dd.share_auth == "1" ? "readWrite" : "readOnly",
                HTTP_SHARE_FILE: dd.share_file
            };
            return df
        }

        function dc(dd) {
            if (dd) {
                if (dd.result == "no_sdcard") {
                    return cP.extend(V, {
                        errorType: "no_sdcard"
                    })
                } else {
                    return {
                        result: true
                    }
                }
            } else {
                return V
            }
        }
    }

    function be() {
        return bz(arguments, {}, dc, dd, null, false);

        function dc(de, df) {
            var dg = {};
            dg.cmd = "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9";
            dg.cmd += ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9";
            dg.multi_data = 1;
            return dg
        }

        function dd(df) {
            if (df) {
                var de = {};
                de.portFilterEnable = df.IPPortFilterEnable;
                de.defaultPolicy = df.DefaultFirewallPolicy;
                var dh = [];
                if (df.IPPortFilterRules_0 != "") {
                    dh.push([0, df.IPPortFilterRules_0])
                }
                if (df.IPPortFilterRules_1 != "") {
                    dh.push([1, df.IPPortFilterRules_1])
                }
                if (df.IPPortFilterRules_2 != "") {
                    dh.push([2, df.IPPortFilterRules_2])
                }
                if (df.IPPortFilterRules_3 != "") {
                    dh.push([3, df.IPPortFilterRules_3])
                }
                if (df.IPPortFilterRules_4 != "") {
                    dh.push([4, df.IPPortFilterRules_4])
                }
                if (df.IPPortFilterRules_5 != "") {
                    dh.push([5, df.IPPortFilterRules_5])
                }
                if (df.IPPortFilterRules_6 != "") {
                    dh.push([6, df.IPPortFilterRules_6])
                }
                if (df.IPPortFilterRules_7 != "") {
                    dh.push([7, df.IPPortFilterRules_7])
                }
                if (df.IPPortFilterRules_8 != "") {
                    dh.push([8, df.IPPortFilterRules_8])
                }
                if (df.IPPortFilterRules_9 != "") {
                    dh.push([9, df.IPPortFilterRules_9])
                }
                de.portFilterRules = db(dh, "IPv4");
                var dg = [];
                if (df.IPPortFilterRulesv6_0 != "") {
                    dg.push([10, df.IPPortFilterRulesv6_0])
                }
                if (df.IPPortFilterRulesv6_1 != "") {
                    dg.push([11, df.IPPortFilterRulesv6_1])
                }
                if (df.IPPortFilterRulesv6_2 != "") {
                    dg.push([12, df.IPPortFilterRulesv6_2])
                }
                if (df.IPPortFilterRulesv6_3 != "") {
                    dg.push([13, df.IPPortFilterRulesv6_3])
                }
                if (df.IPPortFilterRulesv6_4 != "") {
                    dg.push([14, df.IPPortFilterRulesv6_4])
                }
                if (df.IPPortFilterRulesv6_5 != "") {
                    dg.push([15, df.IPPortFilterRulesv6_5])
                }
                if (df.IPPortFilterRulesv6_6 != "") {
                    dg.push([16, df.IPPortFilterRulesv6_6])
                }
                if (df.IPPortFilterRulesv6_7 != "") {
                    dg.push([17, df.IPPortFilterRulesv6_7])
                }
                if (df.IPPortFilterRulesv6_8 != "") {
                    dg.push([18, df.IPPortFilterRulesv6_8])
                }
                if (df.IPPortFilterRulesv6_9 != "") {
                    dg.push([19, df.IPPortFilterRulesv6_9])
                }
                de.portFilterRules = cg.union(de.portFilterRules, db(dg, "IPv6"));
                return de
            } else {
                return V
            }
        }

        function db(de, dj) {
            var di = [];
            if (de && de.length > 0) {
                for (var dg = 0; dg < de.length; dg++) {
                    var df = {};
                    var dh = de[dg][1].split(",");
                    df.index = de[dg][0];
                    df.macAddress = dh[11];
                    df.destIpAddress = dh[4] == "any/0" ? "" : dh[4];
                    df.sourceIpAddress = dh[0] == "any/0" ? "" : dh[0];
                    df.destPortRange = dh[6] == "0" ? "" : dh[6] + " - " + dh[7];
                    df.sourcePortRange = dh[2] == "0" ? "" : dh[2] + " - " + dh[3];
                    df.action = dh[9] == 1 ? "filter_accept" : "filter_drop";
                    df.protocol = transProtocol(dh[8]);
                    df.comment = dh[10];
                    df.ipType = dj;
                    di.push(df)
                }
            }
            return di
        }
    }

    function ai() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "BASIC_SETTING";
            df.portFilterEnabled = dd.portFilterEnable;
            df.defaultFirewallPolicy = dd.defaultPolicy;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function U() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ADD_IP_PORT_FILETER_V4V6";
            df.ip_version = dd.ipType;
            df.mac_address = dd.macAddress;
            df.dip_address = dd.destIpAddress;
            df.sip_address = dd.sourceIpAddress;
            df.dFromPort = dd.destPortStart;
            df.dToPort = dd.destPortEnd;
            df.sFromPort = dd.sourcePortStart;
            df.sToPort = dd.sourcePortEnd;
            df.action = dd.action;
            df.protocol = dd.protocol;
            df.comment = dd.comment;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aB() {
        return bz(arguments, {}, db, dc, null, true);

        function db(de, df) {
            var dg = {};
            var dh = cg.filter(de.indexs, function(di) {
                return di.length == 1
            });
            dg.goformId = "DEL_IP_PORT_FILETER_V4V6";
            var dd = [];
            cg.each(de.indexs, function(di) {
                if (di.length == 2) {
                    dd.push(di.substring(1))
                }
            });
            dg.delete_id_v6 = dd.length > 0 ? dd.join(";") + ";" : "";
            dg.delete_id = dh.length > 0 ? dh.join(";") + ";" : "";
            return dg
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cp() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "WirelessMode,CountryCode,Channel,HT_MCS,wifi_band,wifi_11n_cap,MAX_Access_num,m_MAX_Access_num,MAX_Station_num,wifi_sta_connection";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {
                    mode: de.WirelessMode,
                    countryCode: de.CountryCode,
                    channel: de.Channel,
                    rate: de.HT_MCS,
                    wifiBand: de.wifi_band == "a" ? "a" : "b",
                    bandwidth: de.wifi_11n_cap,
                    MAX_Station_num: cP.isNumeric(de.MAX_Station_num) ? de.MAX_Station_num : aH.MAX_STATION_NUMBER,
                    MAX_Access_num: de.MAX_Access_num,
                    m_MAX_Access_num: de.m_MAX_Access_num,
                    ap_station_enable: de.wifi_sta_connection
                };
                return dd
            } else {
                return V
            }
        }
    }

    function c1() {
        ax(arguments, db, dc);

        function db(dd) {
            var de = {
                goformId: "SET_WIFI_INFO",
                wifiMode: dd.mode,
                countryCode: dd.countryCode,
                MAX_Access_num: dd.station,
                m_MAX_Access_num: dd.m_station
            };
            if (aH.WIFI_BAND_SUPPORT) {
                de.wifi_band = dd.wifiBand
            }
            if (aH.WIFI_BAND_SUPPORT && dd.wifiBand == "a") {
                de.selectedChannel = "auto"
            } else {
                de.selectedChannel = dd.channel;
                de.abg_rate = dd.rate
            }
            if (aH.WIFI_BANDWIDTH_SUPPORT) {
                de.wifi_11n_cap = dd.bandwidth
            }
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function a9() {
        return bz(arguments, {}, db, dc, null, false);

        function db(de, df) {
            var dd = aH.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
            var dg = {
                cmd: "wifi_coverage,m_ssid_enable,imei,network_type,sub_network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,hw_version,MAX_Access_num," + dd + "SSID1,AuthMode,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,pdp_type,ppp_status,sta_ip_status,rj45_state,ethwan_mode,ziccid,lte_band,rssi,nv_sinr,nv_rsrq,nv_pci,cell_id,lte_sinr,lte_rsrp",
                multi_data: 1
            };
            return dg
        }

        function dc(dd) {
            if (dd) {
                return {
                    ssid: dd.SSID1,
                    authMode: dd.AuthMode,
                    passPhrase: aH.PASSWORD_ENCODE ? Base64.decode(dd.WPAPSK1_encode) : c(dd.rnum_js, dd.imei, dd.WPAPSK1_enaes),
                    m_ssid: dd.m_SSID,
                    m_AuthMode: dd.m_AuthMode,
                    m_passPhrase: aH.PASSWORD_ENCODE ? Base64.decode(dd.m_WPAPSK1_encode) : c(dd.rnum_js, dd.imei, dd.m_WPAPSK1_enaes),
                    m_max_access_num: dd.m_MAX_Access_num,
                    multi_ssid_enable: dd.m_ssid_enable,
                    ipAddress: dd.lan_ipaddr,
                    wanIpAddress: dd.wan_ipaddr,
                    staticWanIpAddress: dd.static_wan_ipaddr,
                    ipv6WanIpAddress: dd.ipv6_wan_ipaddr,
                    ipv6PdpType: dd.ipv6_pdp_type,
                    macAddress: dd.mac_address,
                    simSerialNumber: dd.msisdn,
                    lanDomain: dd.LocalDomain,
                    imei: dd.imei,
                    iccid: dd.ziccid,
                    signal: convertSignal(dd),
                    imsi: dd.imsi || dd.sim_imsi,
                    sw_version: dd.cr_version,
                    hw_version: dd.hw_version,
                    max_access_num: dd.MAX_Access_num,
                    wifiRange: dd.wifi_coverage,
                    pdpType: dd.pdp_type,
                    rj45ConnectStatus: (typeof dd.rj45_state == "undefined" || dd.rj45_state == "") ? "dead" : dd.rj45_state,
                    blc_wan_mode: bu.blc_wan_mode,
                    connectStatus: dd.ppp_status,
                    wifiConStatus: dd.sta_ip_status,
                    CellID: dd.cell_id,
                    pci: dd.nv_pci,
                    arfcn: dd.lte_band,
                    ethwan_mode: dd.ethwan_mode.toUpperCase(),
                    rssi: dd.rssi,
                    SINR: dd.nv_sinr,
                    RSRP: dd.rssi,
                    RSRQ: dd.nv_rsrq
                }
            } else {
                return V
            }
        }
    }

    function cW() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "imei,rnum_js",
                multi_data: 1
            };
            return df
        }

        function dc(dd) {
            if (dd) {
                var dg = dd.rnum_js + dd.imei + "FFFFFFFFFFFFFFFFFFFFFFFF";
                var de;
                var df;
                de = dg.substring(0, 24);
                df = dg.substring(0, 16);
                return {
                    skey: de,
                    siv: df
                }
            } else {
                return {
                    skey: "FFFFFFFFFFFFFFFFFFFFFFFF",
                    siv: "FFFFFFFFFFFFFFFF"
                }
            }
        }
    }

    function W() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "wifi_coverage";
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.wifiRangeMode = de.wifi_coverage;
                return dd
            } else {
                return V
            }
        }
    }

    function cY() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_WIFI_COVERAGE";
            df.wifi_coverage = dd.wifiRangeMode;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ak() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "upnpEnabled";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.upnpSetting = de.upnpEnabled == "1" ? "1" : "0";
                return dd
            } else {
                return V
            }
        }
    }

    function a2() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "UPNP_SETTING";
            df.upnp_setting_option = dd.upnpSetting;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aA() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "DMZEnable,DMZIPAddress";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.dmzSetting = de.DMZEnable == "1" ? "1" : "0";
                dd.ipAddress = de.DMZIPAddress;
                return dd
            } else {
                return V
            }
        }
    }

    function cU() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "DMZ_SETTING";
            df.DMZEnabled = dd.dmzSetting;
            if (df.DMZEnabled == "1") {
                df.DMZIPAddress = dd.ipAddress
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function a8() {
        return bz(arguments, {}, dc, dd, null, false);

        function dc(de, df) {
            var dg = {};
            dg.cmd = "PortMapEnable,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9", dg.multi_data = 1;
            return dg
        }

        function dd(df) {
            if (df) {
                var de = {};
                de.portMapEnable = df.PortMapEnable;
                var dg = [];
                if (df.PortMapRules_0 != "") {
                    dg.push([0, df.PortMapRules_0])
                }
                if (df.PortMapRules_1 != "") {
                    dg.push([1, df.PortMapRules_1])
                }
                if (df.PortMapRules_2 != "") {
                    dg.push([2, df.PortMapRules_2])
                }
                if (df.PortMapRules_3 != "") {
                    dg.push([3, df.PortMapRules_3])
                }
                if (df.PortMapRules_4 != "") {
                    dg.push([4, df.PortMapRules_4])
                }
                if (df.PortMapRules_5 != "") {
                    dg.push([5, df.PortMapRules_5])
                }
                if (df.PortMapRules_6 != "") {
                    dg.push([6, df.PortMapRules_6])
                }
                if (df.PortMapRules_7 != "") {
                    dg.push([7, df.PortMapRules_7])
                }
                if (df.PortMapRules_8 != "") {
                    dg.push([8, df.PortMapRules_8])
                }
                if (df.PortMapRules_9 != "") {
                    dg.push([9, df.PortMapRules_9])
                }
                de.portMapRules = db(dg);
                return de
            } else {
                return V
            }
        }

        function db(de) {
            var di = [];
            if (de && de.length > 0) {
                for (var dg = 0; dg < de.length; dg++) {
                    var df = {};
                    var dh = de[dg][1].split(",");
                    df.index = de[dg][0];
                    df.sourcePort = dh[1];
                    df.destIpAddress = dh[0];
                    df.destPort = dh[2];
                    df.protocol = transProtocol(dh[3]);
                    df.comment = dh[4];
                    di.push(df)
                }
            }
            return di
        }
    }

    function bH() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ADD_PORT_MAP";
            df.portMapEnabled = dd.portMapEnable;
            df.fromPort = dd.sourcePort;
            df.ip_address = dd.destIpAddress;
            df.toPort = dd.destPort;
            df.protocol = dd.protocol;
            df.comment = dd.comment;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bE() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ADD_PORT_MAP";
            df.portMapEnabled = dd.portMapEnable;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aY() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "DEL_PORT_MAP";
            df.delete_id = dd.indexs.join(";") + ";";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function I() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,traffic_alined_delta",
                multi_data: 1
            }
        }

        function dc(de) {
            if (de) {
                var df = de.data_volume_limit_unit == "data";
                var dd = {
                    dataLimitChecked: de.data_volume_limit_switch,
                    dataLimitTypeChecked: df ? "1" : "0",
                    limitDataMonth: df ? de.data_volume_limit_size : "0",
                    alertDataReach: df ? de.data_volume_alert_percent : "0",
                    limitTimeMonth: df ? "0" : de.data_volume_limit_size,
                    alertTimeReach: df ? "0" : de.data_volume_alert_percent,
                    monthlySent: de.monthly_tx_bytes == "" ? 0 : de.monthly_tx_bytes,
                    monthlyReceived: de.monthly_rx_bytes == "" ? 0 : de.monthly_rx_bytes,
                    monthlyConnectedTime: de.monthly_time == "" ? 0 : de.monthly_time,
                    traffic_alined_delta: de.traffic_alined_delta == "" ? 0 : de.traffic_alined_delta
                };
                return dd
            } else {
                return V
            }
        }
    }

    function am() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var dg = dd.dataLimitTypeChecked == "1";
            var df = {
                goformId: "DATA_LIMIT_SETTING",
                data_volume_limit_switch: dd.dataLimitChecked
            };
            if (dd.dataLimitChecked == "1") {
                df.data_volume_limit_unit = dg ? "data" : "time";
                df.data_volume_limit_size = dg ? dd.limitDataMonth : dd.limitTimeMonth;
                df.data_volume_alert_percent = dg ? dd.alertDataReach : dd.alertTimeReach
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cz() {
        var dd = arguments[1];
        return bz(arguments, {}, db, dc, null, true);

        function db(de, df) {
            if (de.sendOrReply == "send") {
                return {
                    goformId: "USSD_PROCESS",
                    USSD_operator: de.operator,
                    USSD_send_number: de.strUSSDCommand,
                    notCallback: true
                }
            } else {
                if (de.sendOrReply == "reply") {
                    return {
                        goformId: "USSD_PROCESS",
                        USSD_operator: de.operator,
                        USSD_reply_number: de.strUSSDCommand,
                        notCallback: true
                    }
                }
            }
        }

        function dc(de) {
            if (!de) {
                dd(false, "ussd_fail");
                return
            }
            if (de.result == "success") {
                callbackTemp = dd;
                b8()
            } else {
                dd(false, "ussd_fail")
            }
        }
    }

    function b8() {
        cP.ajax({
            url: "/reqproc/proc_get",
            data: {
                cmd: "ussd_write_flag"
            },
            cache: false,
            async: true,
            dataType: "json",
            success: function(db) {
                if (db.ussd_write_flag == "1") {
                    callbackTemp(false, "ussd_no_service")
                } else {
                    if (db.ussd_write_flag == "4" || db.ussd_write_flag == "unknown" || db.ussd_write_flag == "3") {
                        callbackTemp(false, "ussd_timeout")
                    } else {
                        if (db.ussd_write_flag == "15") {
                            setTimeout(b8, 1000)
                        } else {
                            if (db.ussd_write_flag == "10") {
                                callbackTemp(false, "ussd_retry")
                            } else {
                                if (db.ussd_write_flag == "99") {
                                    callbackTemp(false, "ussd_unsupport")
                                } else {
                                    if (db.ussd_write_flag == "41") {
                                        callbackTemp(false, "operation_not_supported")
                                    } else {
                                        if (db.ussd_write_flag == "2") {
                                            callbackTemp(false, "network_terminated")
                                        } else {
                                            if (db.ussd_write_flag == "16") {
                                                cP.ajax({
                                                    url: "/reqproc/proc_get",
                                                    data: {
                                                        cmd: "ussd_data_info"
                                                    },
                                                    dataType: "json",
                                                    async: true,
                                                    cache: false,
                                                    success: function(dc) {
                                                        var dd = {};
                                                        dd.data = dc.ussd_data;
                                                        dd.ussd_action = dc.ussd_action;
                                                        dd.ussd_dcs = dc.ussd_dcs;
                                                        callbackTemp(true, dd)
                                                    },
                                                    error: function() {
                                                        callbackTemp(false, "ussd_info_error")
                                                    }
                                                })
                                            } else {
                                                callbackTemp(false, "ussd_fail")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            error: function() {
                callbackTemp(false, "ussd_fail")
            }
        })
    }

    function p(dc) {
        cP.ajax({
            url: "/reqproc/proc_post",
            data: {
                goformId: "USSD_PROCESS",
                USSD_operator: "ussd_cancel"
            },
            cache: false,
            dataType: "json",
            success: function(dd) {
                if (dd.result == "success") {
                    db()
                } else {
                    dc(false)
                }
            }
        });

        function db() {
            cP.ajax({
                url: "/reqproc/proc_get",
                data: {
                    cmd: "ussd_write_flag"
                },
                cache: false,
                async: true,
                dataType: "json",
                success: function(dd) {
                    if (dd.ussd_write_flag == "15") {
                        setTimeout(db, 1000)
                    } else {
                        if (dd.ussd_write_flag == "13") {
                            dc(true)
                        } else {
                            dc(false)
                        }
                    }
                },
                error: function() {
                    dc(false)
                }
            })
        }
    }

    function aM() {
        var df = arguments[1];
        var de = 0;
        return bz(arguments, {}, db, dc, null, true);

        function db(dg) {
            return {
                goformId: "UNLOCK_NETWORK",
                notCallback: true,
                unlock_network_code: dg.unlock_network_code
            }
        }

        function dc(dg) {
            if (dg && dg.result == "success") {
                cQ(dd)
            } else {
                df({
                    result: "fail"
                })
            }
        }

        function dd() {
            if (de > 5) {
                C(dd);
                df({
                    result: "fail"
                })
            } else {
                if (bu.simStatus != "modem_imsi_waitnck") {
                    C(dd);
                    df({
                        result: "success"
                    })
                }
            }
            de++
        }
    }

    function cj() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                cmd: "unlock_nck_time"
            }
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function c4() {
        var dd = arguments[1];
        return bz(arguments, {}, db, dc, null, true);

        function db(de) {
            return {
                goformId: "SET_UPGRADE_NOTICE",
                upgrade_notice_flag: de.upgrade_notice_flag,
                notCallback: true
            }
        }

        function dc(de) {
            if (de.result == "success") {
                dd(true)
            } else {
                dd(false)
            }
        }
    }

    function b2() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                cmd: "upgrade_notice_flag"
            }
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function au() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: 1,
                cmd: "wifi_sta_connection,pswan_priority,wifiwan_priority,ethwan_priority"
            }
        }

        function dc(dd) {
            if (dd) {
                return {
                    ap_station_enable: dd.wifi_sta_connection,
                    ap_station_mode: parseInt(dd.wifiwan_priority, 10) > parseInt(dd.pswan_priority, 10) ? "wifi_pref" : "dial_pref"
                }
            } else {
                return V
            }
        }
    }

    function bc() {
        var dc = arguments[0];
        return bz(arguments, {}, db, dd, null, true);

        function db(de) {
            return {
                goformId: "WIFI_STA_CONTROL",
                wifi_sta_connection: de.ap_station_enable
            }
        }

        function dd(de) {
            if (de && de.result == "success") {
                bu.ap_station_enable = dc.ap_station_enable == 1;
                return de
            } else {
                return V
            }
        }
    }

    function aa() {
        return au({}, function(db) {
            bu.ap_station_enable = db.ap_station_enable == 1;
            bu.ap_station_mode = db.ap_station_mode
        })
    }

    function cl() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, df) {
            var dg = "wifi_profile_num,wifi_profile";
            for (var de = 1; de < aH.AP_STATION_LIST_LENGTH; de++) {
                dg = dg + ",wifi_profile" + de
            }
            return {
                multi_data: 1,
                cmd: dg
            }
        }

        function dc(dd) {
            if (dd) {
                var di = [];
                for (var dh = 0; dh < aH.AP_STATION_LIST_LENGTH; dh++) {
                    var dk = "";
                    if (dh == 0) {
                        dk = dd.wifi_profile
                    } else {
                        dk = dd["wifi_profile" + dh]
                    }
                    var dg = dk.split(";");
                    for (var df = 0; df < dg.length; df++) {
                        var dj = dg[df].split(",");
                        if (!dj[0]) {
                            break
                        }
                        var de = {
                            profileName: dj[0],
                            fromProvider: dj[1],
                            connectStatus: dj[2],
                            signal: dj[3],
                            ssid: dj[4],
                            authMode: dj[5],
                            encryptType: dj[6],
                            password: dj[7] == "0" ? "" : dj[7],
                            keyID: dj[8],
                            mac: dj[9]
                        };
                        di.push(de)
                    }
                }
                return {
                    hotspotList: di
                }
            } else {
                return V
            }
        }
    }

    function an() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd) {
            return {
                goformId: "WLAN_SET_STA_REFRESH"
            }
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function X() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: 1,
                cmd: "scan_finish,EX_APLIST,EX_APLIST1"
            }
        }

        function dc(dd) {
            if (dd) {
                if (dd.scan_finish == "0") {
                    return {
                        scan_finish: "0",
                        hotspotList: []
                    }
                }
                if (dd.scan_finish == "2") {
                    return {
                        scan_finish: "2",
                        hotspotList: []
                    }
                }
                var di = [];
                for (var dh = 0; dh <= 1; dh++) {
                    var dk;
                    if (dh == 0) {
                        dk = dd.EX_APLIST
                    } else {
                        dk = dd.EX_APLIST1
                    }
                    var dg = dk.split(";");
                    for (var df = 0; df < dg.length; df++) {
                        var dj = dg[df].split(",");
                        if (!dj[0]) {
                            break
                        }
                        var de = {
                            fromProvider: dj[0],
                            connectStatus: dj[1],
                            ssid: dj[2],
                            signal: dj[3],
                            channel: dj[4],
                            authMode: dj[5],
                            encryptType: dj[6],
                            mac: dj[7]
                        };
                        di.push(de)
                    }
                }
                return {
                    scan_finish: "1",
                    hotspotList: di
                }
            } else {
                return V
            }
        }
    }

    function cN(dc) {
        var db = [];
        db.push(dc.profileName);
        db.push(dc.fromProvider || "0");
        db.push(dc.connectStatus || "0");
        db.push(dc.signal);
        db.push(dc.ssid);
        db.push(dc.authMode);
        db.push(dc.encryptType);
        db.push(dc.password || "0");
        db.push(dc.keyID);
        db.push(dc.mac);
        return db.join(",")
    }

    function aj() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dm) {
            var dn = dm.apList;
            var dd = "modify";
            if (dm.profileName == "") {
                dd = "add";
                var di = (jQuery.fn.jquery + Math.random()).replace(/\D/g, "");
                dm.profileName = di;
                dn.push({
                    profileName: di,
                    fromProvider: "0",
                    connectStatus: "0",
                    signal: dm.signal,
                    ssid: dm.ssid,
                    authMode: dm.authMode,
                    encryptType: dm.encryptType,
                    password: dm.password || "0",
                    keyID: dm.keyID,
                    mac: dm.mac
                })
            }
            var dk = {
                profile0: []
            };
            for (var de = 1; de < aH.AP_STATION_LIST_LENGTH; de++) {
                dk["profile" + de] = []
            }
            var df = "";
            for (var de = 0; de < dn.length; de++) {
                var dh = "";
                if (dm.profileName == dn[de].profileName) {
                    dh = cN(dm);
                    df = dh
                } else {
                    dh = cN(dn[de])
                }
                var dg = parseInt(de % 10);
                dk["profile" + dg].push(dh)
            }
            var dj = {
                wifi_profile: dk.profile0.join(";")
            };
            for (var de = 1; de < aH.AP_STATION_LIST_LENGTH; de++) {
                dj["wifi_profile" + de] = dk["profile" + de].join(";")
            }
            var dl = cP.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: dn.length,
                wifi_update_profile: df,
                action: dd
            }, dj);
            return dl
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cV() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dm) {
            var dp = dm.apList;
            var dk = {
                profile0: []
            };
            for (var de = 1; de < aH.AP_STATION_LIST_LENGTH; de++) {
                dk["profile" + de] = []
            }
            var dd = false;
            var dg = "";
            for (var de = 0; de < dp.length; de++) {
                var di = cN(dp[de]);
                if (dp[de].profileName == dm.profileName) {
                    dd = true;
                    dg = di;
                    continue
                }
                var dn = de;
                if (dd) {
                    dn = de - 1
                }
                var dh = parseInt(dn % 10);
                dk["profile" + dh].push(di)
            }
            var df = dd ? dp.length - 1 : dp.length;
            var dj = {
                wifi_profile: dk.profile0.join(";")
            };
            for (var de = 1; de < aH.AP_STATION_LIST_LENGTH; de++) {
                dj["wifi_profile" + de] = dk["profile" + de].join(";")
            }
            var dl = cP.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: df,
                wifi_update_profile: dg,
                action: "delete"
            }, dj);
            return dl
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bG() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd) {
            return {
                goformId: "WLAN_SET_STA_CON",
                EX_SSID1: dd.EX_SSID1,
                EX_AuthMode: dd.EX_AuthMode,
                EX_EncrypType: dd.EX_EncrypType,
                EX_DefaultKeyID: dd.EX_DefaultKeyID,
                EX_WEPKEY: dd.EX_WEPKEY,
                EX_WPAPSK1: dd.EX_WPAPSK1,
                EX_wifi_profile: dd.EX_wifi_profile,
                EX_mac: dd.EX_mac
            }
        }

        function dc(dd) {
            if (dd && (dd.result == "success" || dd.result == "processing")) {
                return dd
            } else {
                return V
            }
        }
    }

    function aK() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd) {
            return {
                goformId: "WLAN_SET_STA_DISCON"
            }
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cS() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: 1,
                cmd: "blc_wan_mode,blc_wan_auto_mode,loginfo,ppp_status,rj45_state,ethwan_mode"
            }
        }

        function dc(de) {
            if (de) {
                var dd = {};
                if (de.blc_wan_mode == "AUTO") {
                    dd.blc_wan_mode = de.blc_wan_auto_mode ? de.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    dd.blc_wan_mode = de.blc_wan_mode ? de.blc_wan_mode : "PPP"
                }
                dd.loginfo = de.loginfo;
                dd.ppp_status = de.ppp_status;
                dd.rj45_state = (typeof de.rj45_state == "undefined" || de.rj45_state == "") ? "dead" : de.rj45_state;
                dd.ethwan_mode = de.ethwan_mode.toUpperCase();
                return dd
            } else {
                return V
            }
        }
    }

    function a3() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                cmd: "rj45_plug"
            }
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.rj45_plug = de.rj45_plug == "" ? "wan_lan_off" : de.rj45_plug;
                return dd
            } else {
                return V
            }
        }
    }

    function cx(db, dc) {
        if (aH.RJ45_SUPPORT) {
            if (dc == "dead" || dc == "") {
                return "PPP"
            } else {
                if (!db || db == "undefined") {
                    if (dc == "working") {
                        return "PPPOE"
                    } else {
                        return "PPP"
                    }
                } else {
                    return db
                }
            }
        } else {
            return "PPP"
        }
    }

    function bi(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({
                goformId: "OPERATION_MODE"
            }, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function a6() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: 1,
                cmd: "opms_wan_auto_mode,ethwan_mode,pppoe_username,pppoe_cc,ethwan_dialmode,ppp_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,rj45_state,lan_ipaddr,lan_netmask"
            }
        }

        function dc(dd) {
            if (dd) {
                return {
                    opms_wan_auto_mode: dd.opms_wan_auto_mode,
                    ethwan_mode: dd.ethwan_mode.toUpperCase(),
                    pppoe_username: dd.pppoe_username,
                    pppoe_cc: dd.pppoe_cc,
                    ethwan_dialmode: dd.ethwan_dialmode == "manual" ? "manual_dial" : "auto_dial",
                    ppp_status: dd.ppp_status,
                    static_wan_ipaddr: dd.static_wan_ipaddr,
                    static_wan_netmask: dd.static_wan_netmask,
                    static_wan_gateway: dd.static_wan_gateway,
                    static_wan_primary_dns: dd.static_wan_primary_dns,
                    static_wan_secondary_dns: dd.static_wan_secondary_dns,
                    rj45_state: (typeof dd.rj45_state == "undefined" || dd.rj45_state == "") ? "dead" : dd.rj45_state,
                    lan_ipaddr: dd.lan_ipaddr,
                    lan_netmask: dd.lan_netmask
                }
            } else {
                return V
            }
        }
    }

    function cB(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({
                notCallback: true
            }, df);
            return dg
        }

        function dd(df) {
            if (df.result == "success") {
                de({
                    result: true
                })
            } else {
                de({
                    result: false
                })
            }
        }
    }

    function aq(db, df) {
        return bz(arguments, {}, dc, dd, null, false);

        function dc(dg, dh) {
            return {
                multi_data: 1,
                cmd: "sntp_year,sntp_month,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_static_server0,sntp_static_server1,sntp_static_server2,sntp_server0,sntp_server1,sntp_server2,sntp_server3,sntp_server4,sntp_server5,sntp_server6,sntp_server7,sntp_server8,sntp_server9,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_timezone_index,sntp_dst_enable,ppp_status,sntp_process_result,rj45_state"
            }
        }

        function dd(dg) {
            if (dg) {
                var dh = de(dg);
                return {
                    sntp_year: dg.sntp_year,
                    sntp_month: dg.sntp_month,
                    sntp_day: dg.sntp_day,
                    sntp_hour: dg.sntp_hour,
                    sntp_minute: dg.sntp_minute,
                    sntp_second: dg.sntp_second,
                    sntp_time_set_mode: dg.sntp_time_set_mode,
                    sntp_servers: dh,
                    sntp_server0: dg.sntp_server0,
                    sntp_server1: dg.sntp_server1,
                    sntp_server2: dg.sntp_server2,
                    sntp_static_server0: dg.sntp_static_server0,
                    sntp_static_server1: dg.sntp_static_server1,
                    sntp_static_server2: dg.sntp_static_server2,
                    sntp_other_server0: dg.sntp_other_server0,
                    sntp_other_server1: dg.sntp_other_server1,
                    sntp_other_server2: dg.sntp_other_server2,
                    sntp_timezone: dg.sntp_timezone,
                    sntp_timezone_index: dg.sntp_timezone_index ? dg.sntp_timezone_index : "0",
                    sntp_dst_enable: dg.sntp_dst_enable,
                    ppp_status: dg.ppp_status,
                    blc_wan_mode: bu.blc_wan_mode,
                    sntp_process_result: dg.sntp_process_result,
                    rj45_state: (typeof dg.rj45_state == "undefined" || dg.rj45_state == "") ? "dead" : dg.rj45_state
                }
            } else {
                return V
            }
        }

        function de(dg) {
            var dk = [];
            for (var dj = 0; dj < 3; dj++) {
                var di = "sntp_static_server" + (dj).toString();
                if (dg[di] != "") {
                    var dm = {};
                    dm.name = dg[di];
                    dm.value = dg[di];
                    dk.push(dm)
                }
            }
            var dl = [{
                name: "Other",
                value: "Other"
            }, {
                name: "NONE",
                value: ""
            }];
            for (var dh = 0; dh < 2; dh++) {
                dk.push(dl[dh])
            }
            return dk
        }
    }

    function b7(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({}, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function g(db, de) {
        var dd = cP.extend({}, db);
        cP.post("reqproc/proc_post", dd, function(df) {
            if (df && df.result == "success") {
                if (db.manualsettime == "auto") {
                    setTimeout(dc, 2000);
                    de(df)
                } else {
                    de(true)
                }
            } else {
                if (df && df.result == "processing") {
                    de(df)
                } else {
                    de(false)
                }
            }
        }, "json");

        function dc() {
            cP.ajax({
                url: "reqproc/proc_get",
                dataType: "json",
                data: {
                    cmd: "sntp_process_result"
                },
                cache: false,
                async: false,
                success: function(df) {
                    if (df.sntp_process_result == "failure") {
                        de(false)
                    } else {
                        if (df.sntp_process_result == "success") {
                            de(true)
                        } else {
                            setTimeout(dc, 2000)
                        }
                    }
                },
                error: function() {
                    de(false)
                }
            })
        }
    }

    function ca(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({}, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function bR() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                cmd: "websURLFilters"
            }
        }

        function dc(dd) {
            var dg = [];
            if (dd) {
                if (dd.websURLFilters.length == 0) {
                    return {
                        urlFilterRules: []
                    }
                } else {
                    var dh = dd.websURLFilters.split(";");
                    for (var df = 0; df < dh.length; df++) {
                        var de = {};
                        de.index = df;
                        de.url = dh[df];
                        dg.push(de)
                    }
                    return {
                        urlFilterRules: dg
                    }
                }
            } else {
                return V
            }
        }
    }

    function cn(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({}, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function bI() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: "1",
                cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,wifi_cur_state "
            }
        }

        function dc(dd) {
            if (dd) {
                return {
                    currentMode: dd.wifi_wds_mode,
                    wdsSSID: dd.wifi_wds_ssid,
                    wdsAuthMode: dd.wifi_wds_AuthMode,
                    wdsEncrypType: dd.wifi_wds_EncrypType,
                    wdsWPAPSK1: dd.wifi_wds_WPAPSK1,
                    RadioOff: dd.wifi_cur_state == "1" ? "1" : "0"
                }
            } else {
                return V
            }
        }
    }

    function ao(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({}, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function x() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: "1",
                cmd: "syslog_mode,debug_level"
            }
        }

        function dc(dd) {
            if (dd) {
                return {
                    currentMode: dd.syslog_mode,
                    debugLevel: dd.debug_level
                }
            } else {
                return V
            }
        }
    }

    function ba(db, de) {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(df) {
            var dg = cP.extend({}, df);
            return dg
        }

        function dd(df) {
            if (df && df.result == "success") {
                return df
            } else {
                return V
            }
        }
    }

    function b6() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            return {
                multi_data: "1",
                cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,wifi_cur_state,user_ip_addr,client_mac_address,wifi_mac_white_list"
            }
        }

        function dc(dd) {
            if (dd) {
                return {
                    ACL_mode: dd.ACL_mode,
                    wifi_mac_black_list: dd.wifi_mac_black_list,
                    wifi_hostname_black_list: dd.wifi_hostname_black_list,
                    RadioOff: dd.wifi_cur_state == "1" ? "1" : "0",
                    user_ip_addr: dd.user_ip_addr,
                    client_mac_address: dd.client_mac_address,
                    wifi_mac_white_list: dd.wifi_mac_white_list
                }
            } else {
                return V
            }
        }
    }

    function aC() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd) {
            var de = cP.extend({
                goformId: "WIFI_MAC_FILTER"
            }, dd);
            return de
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function at() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd) {
            return {
                cmd: "mgmt_quicken_power_on,need_hard_reboot,need_sim_pin",
                multi_data: 1
            }
        }

        function dc(dd) {
            return {
                fastbootEnabled: dd.mgmt_quicken_power_on == "1" ? "1" : "0",
                need_hard_reboot: dd.need_hard_reboot,
                need_sim_pin: dd.need_sim_pin == "yes" ? "yes" : "no"
            }
        }
    }

    function bO() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd) {
            return {
                goformId: "MGMT_CONTROL_POWER_ON_SPEED",
                mgmt_quicken_power_on: dd.fastbootEnabled
            }
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function a5() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "TURN_OFF_DEVICE";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function ah() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "REBOOT_DEVICE";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function Y() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "fota_new_version_state,fota_current_upgrade_state,fota_package_already_download";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                var de = (dd.fota_new_version_state == "has_critical" || dd.fota_new_version_state == "has_optional" || dd.fota_new_version_state == "already_has_pkg");
                dd.hasNewVersion = de;
                return dd
            } else {
                return V
            }
        }
    }

    function bk() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            if (aH.UPGRADE_TYPE == "OTA") {
                df.cmd = "is_mandatory"
            } else {
                df.cmd = "fota_new_version_state"
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                if (aH.UPGRADE_TYPE == "OTA") {
                    return {
                        is_mandatory: dd.is_mandatory == "1"
                    }
                } else {
                    return {
                        is_mandatory: dd.fota_new_version_state == "has_critical"
                    }
                }
            } else {
                return V
            }
        }
    }

    function cC() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "upgrade_result";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bh() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "fota_current_upgrade_state";
            return df
        }

        function dc(dd) {
            if (dd) {
                dd.current_upgrade_state = dd.fota_current_upgrade_state;
                return dd
            } else {
                return V
            }
        }
    }

    function O() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "fota_pkg_total_size,fota_dl_pkg_size";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function N() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "IF_UPGRADE";
            df.select_op = dd.selectOp;
            if (df.select_op == "check") {
                df.ota_manual_check_roam_state = 1
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function G() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "fota_updateMode,fota_updateIntervalDay,fota_allowRoamingUpdate";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return {
                    updateMode: dd.fota_updateMode,
                    updateIntervalDay: dd.fota_updateIntervalDay,
                    allowRoamingUpdate: dd.fota_allowRoamingUpdate
                }
            } else {
                return V
            }
        }
    }

    function al() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SetUpgAutoSetting";
            df.UpgMode = dd.updateMode;
            df.UpgIntervalDay = dd.updateIntervalDay;
            df.UpgRoamPermission = dd.allowRoamingUpdate;
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function c8() {
        return cm({
            nv: ["dm_last_check_time"]
        }, arguments[1], arguments[2])
    }

    function h() {
        return cm({
            nv: ["network_type", "sub_network_type", "rssi", "lte_rscp", "lte_rsrp", "nv_rsrq", "nv_sinr", "lte_band", "cell_id"]
        }, arguments[1], arguments[2])
    }

    function j() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "RESULT_RESTORE";
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function v() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "childGroupList"
            };
            return df
        }

        function dc(dd) {
            if (dd && (dd.childGroupList || dd.devices)) {
                return dd
            } else {
                return {
                    devices: []
                }
            }
        }
    }

    function cs() {
        return bz(arguments, aH.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "ADD_DEVICE",
                mac: dd.macAddress
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cG() {
        return bz(arguments, aH.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "DEL_DEVICE",
                mac: dd.mac
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function s(db) {
        if (typeof aH.currentUserInChildGroup == "undefined") {
            var de = [];
            if (typeof db != "undefined") {
                de = db
            } else {
                de = v({}).devices
            }
            var dc = a1({}).get_user_mac_addr;
            var dd = cg.find(de, function(df) {
                return df.mac == dc
            });
            aH.currentUserInChildGroup = typeof dd != "undefined";
            return {
                result: typeof dd != "undefined"
            }
        }
        return {
            result: aH.currentUserInChildGroup
        }
    }

    function a1() {
        return cm({
            nv: "get_user_mac_addr"
        }, arguments[1], arguments[2])
    }

    function u() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "hostNameList"
            };
            return df
        }

        function dc(dd) {
            if (dd && (dd.hostNameList || dd.devices)) {
                return dd
            } else {
                return {
                    devices: []
                }
            }
        }
    }

    function bg() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "EDIT_HOSTNAME",
                mac: dd.mac,
                hostname: dd.hostname
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function c3() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "site_white_list"
            };
            return df
        }

        function dc(dd) {
            if (dd && (dd.site_white_list || dd.siteList)) {
                return dd
            } else {
                return {
                    siteList: []
                }
            }
        }
    }

    function F() {
        return bz(arguments, aH.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "REMOVE_WHITE_SITE",
                ids: dd.ids.join(",")
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function bB() {
        return bz(arguments, aH.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "ADD_WHITE_SITE",
                name: dd.name,
                site: dd.site
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function b5() {
        var de = {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": []
        };
        return bz(arguments, {}, db, dd, null, false);

        function db(df, dg) {
            var dh = {
                cmd: "time_limited"
            };
            return dh
        }

        function dd(df) {
            if (df) {
                return dc(df)
            } else {
                return de
            }
        }

        function dc(df) {
            if (df.time_limited == "") {
                return {
                    time_limited: []
                }
            }
            var dg = df.time_limited.split(";");
            cg.each(dg, function(dh) {
                var di = dh.split("+");
                if (di.length == 2) {
                    de[di[0]] = di[1].split(",")
                }
            });
            return de
        }
    }

    function n() {
        return bz(arguments, aH.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "SAVE_TIME_LIMITED",
                time_limited: dd.time
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function ct() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "openEnable,closeEnable,openTime,closeTime",
                multi_data: "1"
            };
            return df
        }

        function dc(dd) {
            if (dd) {
                if (dd.openTime.indexOf(":") != -1) {
                    var de = dd.openTime.split(":");
                    dd.openH = leftInsert(de[0], 2, "0");
                    dd.openM = leftInsert(de[1], 2, "0")
                } else {
                    dd.openH = "06";
                    dd.openM = "00"
                }
                if (dd.closeTime.indexOf(":") != -1) {
                    var df = dd.closeTime.split(":");
                    dd.closeH = leftInsert(df[0], 2, "0");
                    dd.closeM = leftInsert(df[1], 2, "0")
                } else {
                    dd.closeH = "22";
                    dd.closeM = "00"
                }
                return dd
            } else {
                return V
            }
        }
    }

    function bN() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "SAVE_TSW",
                openEnable: dd.openEnable,
                closeEnable: dd.closeEnable
            };
            if (dd.openEnable == "1") {
                df.openTime = dd.openTime;
                df.closeTime = dd.closeTime
            }
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                if (dd && dd.result == "failure") {
                    return dd
                } else {
                    return V
                }
            }
        }
    }

    function aN() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {
                goformId: "FLOW_CALIBRATION_MANUAL",
                calibration_way: dd.way,
                time: dd.way == "time" ? dd.value : 0,
                data: dd.way == "data" ? dd.value : 0
            };
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cm() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            if (cg.isArray(dd.nv)) {
                df.cmd = dd.nv.join(",");
                df.multi_data = 1
            } else {
                df.cmd = dd.nv
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function aP() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "vwim_mc_state,traffic_overrun,detect_new_version";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.vwim_mc_state = de.vwim_mc_state;
                dd.traffic_overrun = de.traffic_overrun;
                dd.detect_new_version = de.detect_new_version;
                dd.blc_wan_mode = bu.blc_wan_mode;
                return dd
            } else {
                return V
            }
        }
    }

    function cJ() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "CLEAR_REDIRECT_FLAG";
            df.flag_id = dd.redirectFlags;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function b4() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "lock_zone_enable,pin_interlock_and_V4_lock";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bL() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "PIN_LOCK_V4_ENCODE";
            df.pin_interlock_and_V4_lock = dd.pin_interlock_and_V4_lock;
            df.TspLock_key_data = dd.TspLock_key_data;
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function aG() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "cell_id_list,global_cell_id,network_type,sub_network_type,cell_not_correct";
            df.multi_data = 1;
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bZ() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "LOCK_ZONE";
            df.lock_zone_enable = dd.lock_zone_enable;
            return df
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return V
            }
        }
    }

    function cR() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {
                cmd: "update_type"
            };
            return df
        }

        function dc(dd) {
            return {
                update_type: dd.update_type ? dd.update_type : "mifi_fota"
            }
        }
    }

    function cr() {
        return bz(arguments, {}, db, dc, null, true);

        function db(df, dd) {
            var de = {};
            de.goformId = "alk_set_lan_dns_config";
            de.lan_dns_ip = df.lan_dns_ip;
            de.lan_dns_mode = df.lan_dns_mode;
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function f() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, de) {
            var df = {};
            df.cmd = "AuthMode,passPhrase";
            df.multi_data = 1;
            return df
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.AuthMode = de.AuthMode;
                dd.passPhrase = aH.PASSWORD_ENCODE ? Base64.decode(de.passPhrase) : de.passPhrase;
                return dd
            } else {
                return V
            }
        }
    }

    function z() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "SET_WIFI_SECURITY_INFO";
            df.AuthMode = dd.AuthMode;
            if (df.AuthMode == "WPAPSKWPA2PSK") {
                df.passPhrase = aH.PASSWORD_ENCODE ? Base64.encode(dd.passPhrase) : dd.passPhrase
            }
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cf() {
        ax(arguments, db, dc);

        function db(dd) {
            var de = {
                goformId: "SET_WIFI_SSID1_SETTINGS",
                ssid: dd.SSID,
                broadcastSsidEnabled: dd.broadcast,
                MAX_Access_num: dd.station,
                security_mode: dd.AuthMode,
                cipher: dd.cipher,
                NoForwarding: dd.NoForwarding,
                show_qrcode_flag: dd.show_qrcode_flag
            };
            if (aH.WIFI_WEP_SUPPORT) {
                de.wep_default_key = dd.wep_default_key;
                de.wep_key_1 = dd.wep_key_1;
                de.wep_key_2 = dd.wep_key_2;
                de.wep_key_3 = dd.wep_key_3;
                de.wep_key_4 = dd.wep_key_4;
                if (dd.wep_default_key == "1") {
                    de.WEP2Select = dd.WEP2Select
                } else {
                    if (dd.wep_default_key == "2") {
                        de.WEP3Select = dd.WEP3Select
                    } else {
                        if (dd.wep_default_key == "3") {
                            de.WEP4Select = dd.WEP4Select
                        } else {
                            de.WEP1Select = dd.WEP1Select
                        }
                    }
                }
            }
            if (dd.AuthMode == "WPAPSK" || dd.AuthMode == "WPA2PSK" || dd.AuthMode == "WPAPSKWPA2PSK" || dd.AuthMode == "WPA3Personal" || dd.AuthMode == "WPA2WPA3") {
                de.security_shared_mode = dd.cipher;
                de.passphrase = aH.PASSWORD_ENCODE ? Base64.encode(dd.passPhrase) : dd.passPhrase
            } else {
                if (dd.AuthMode == "SHARED") {
                    de.security_shared_mode = "WEP";
                    de.security_mode = "SHARED"
                } else {
                    if (dd.encryptType == "WEP") {
                        de.security_shared_mode = "WEP";
                        de.security_mode = "OPEN"
                    } else {
                        de.security_shared_mode = "NONE"
                    }
                }
            }
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bK() {
        ax(arguments, db, dc);

        function db(dd) {
            var de = {
                goformId: "SET_WIFI_SSID2_SETTINGS",
                m_SSID: dd.m_SSID,
                m_HideSSID: dd.m_broadcast,
                m_MAX_Access_num: dd.m_station,
                m_AuthMode: dd.m_AuthMode,
                cipher: dd.m_cipher,
                m_NoForwarding: dd.m_NoForwarding,
                m_show_qrcode_flag: dd.m_show_qrcode_flag
            };
            if (aH.WIFI_WEP_SUPPORT) {
                de.m_DefaultKeyID = dd.m_wep_default_key;
                de.m_Key1Str1 = dd.m_wep_key_1;
                de.m_Key2Str1 = dd.m_wep_key_2;
                de.m_Key3Str1 = dd.m_wep_key_3;
                de.m_Key4Str1 = dd.m_wep_key_4;
                if (dd.m_wep_default_key == "1") {
                    de.m_Key2Type = dd.m_WEP2Select
                } else {
                    if (dd.m_wep_default_key == "2") {
                        de.m_Key3Type = dd.m_WEP3Select
                    } else {
                        if (dd.m_wep_default_key == "3") {
                            de.m_Key4Type = dd.m_WEP4Select
                        } else {
                            de.m_Key1Type = dd.m_WEP1Select
                        }
                    }
                }
            }
            if (dd.m_AuthMode == "WPAPSK" || dd.m_AuthMode == "WPA2PSK" || dd.m_AuthMode == "WPAPSKWPA2PSK" || dd.m_AuthMode == "WPA3Personal" || dd.m_AuthMode == "WPA2WPA3") {
                de.m_EncrypType = dd.m_cipher;
                de.m_WPAPSK1 = aH.PASSWORD_ENCODE ? Base64.encode(dd.m_passPhrase) : dd.m_passPhrase
            } else {
                if (dd.m_AuthMode == "SHARED") {
                    de.m_EncrypType = "WEP";
                    de.m_security_mode = "SHARED"
                } else {
                    if (dd.m_encryptType == "WEP") {
                        de.m_EncrypType = "WEP";
                        de.m_security_mode = "OPEN"
                    } else {
                        de.m_EncrypType = "NONE"
                    }
                }
            }
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function cy() {
        return bz(arguments, {}, db, dc, null, false);

        function db(df, dd) {
            var de = {};
            de.cmd = "lte_band,cell_id,ping_google";
            de.multi_data = 1;
            return de
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.lte_band = de.lte_band;
                dd.cell_id = de.cell_id;
                dd.ping_google = de.ping_google;
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function q() {
        return bz(arguments, {}, db, dc, null, false);

        function db(df, dd) {
            var de = {};
            de.cmd = "work_lte_band";
            de.multi_data = 1;
            return de
        }

        function dc(de) {
            if (de) {
                var dd = {};
                dd.work_lte_band = de.work_lte_band;
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function R() {
        return bz(arguments, {}, db, dc, null, false);

        function db(df, dd) {
            var de = {};
            de.goformId = "SET_FREQ_BAND";
            de.work_lte_band = df.work_lte_band;
            de.ping_google = df.ping_google;
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function d() {
        return bz(arguments, {}, db, dc, null, false);

        function db(dd, df) {
            var dg = {};
            var de = aH.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "imei,rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
            dg.cmd = "m_ssid_enable,wifi_cur_state,NoForwarding,m_NoForwarding," + de + "MAX_Station_num,SSID1,AuthMode,HideSSID,MAX_Access_num,show_qrcode_flag,EncrypType,Key1Str1,Key2Str1,Key3Str1,Key4Str1,DefaultKeyID,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,m_show_qrcode_flag,m_DefaultKeyID,m_Key1Str1,m_Key2Str1,m_Key3Str1,m_Key4Str1,rotationFlag,wifi_sta_connection";
            dg.multi_data = 1;
            return dg
        }

        function dc(de) {
            if (de) {
                var dd = {
                    wifi_enable: de.wifi_cur_state == "1" ? "1" : "0",
                    multi_ssid_enable: de.m_ssid_enable,
                    MAX_Station_num: cP.isNumeric(de.MAX_Station_num) ? de.MAX_Station_num : aH.MAX_STATION_NUMBER,
                    AuthMode: de.AuthMode,
                    SSID: de.SSID1,
                    broadcast: de.HideSSID,
                    apIsolation: de.NoForwarding,
                    passPhrase: aH.PASSWORD_ENCODE ? Base64.decode(de.WPAPSK1_encode) : c(de.rnum_js, de.imei, de.WPAPSK1_enaes),
                    MAX_Access_num: de.MAX_Access_num,
                    cipher: de.EncrypType == "TKIP" ? "0" : de.EncrypType == "AES" ? 1 : 2,
                    encryptType: de.EncrypType,
                    show_qrcode_flag: de.show_qrcode_flag == "1" ? true : false,
                    keyID: de.DefaultKeyID,
                    Key1Str1: de.Key1Str1,
                    Key2Str1: de.Key2Str1,
                    Key3Str1: de.Key3Str1,
                    Key4Str1: de.Key4Str1,
                    m_SSID: de.m_SSID,
                    m_broadcast: de.m_HideSSID,
                    m_apIsolation: de.m_NoForwarding,
                    m_MAX_Access_num: de.m_MAX_Access_num,
                    m_AuthMode: de.m_AuthMode,
                    m_passPhrase: aH.PASSWORD_ENCODE ? Base64.decode(de.m_WPAPSK1_encode) : c(de.rnum_js, de.imei, de.m_WPAPSK1_enaes),
                    m_cipher: de.m_EncrypType == "TKIP" ? "0" : de.m_EncrypType == "AES" ? 1 : 2,
                    m_show_qrcode_flag: de.m_show_qrcode_flag == "1" ? true : false,
                    m_encryptType: de.m_EncrypType,
                    m_keyID: de.m_DefaultKeyID,
                    m_Key1Str1: de.m_Key1Str1,
                    m_Key2Str1: de.m_Key2Str1,
                    m_Key3Str1: de.m_Key3Str1,
                    m_Key4Str1: de.m_Key4Str1,
                    rotationFlag: de.rotationFlag,
                    ap_station_enable: de.wifi_sta_connection
                };
                return dd
            } else {
                return V
            }
        }
    }

    function t() {
        ax(arguments, db, dc);

        function db(dd) {
            var df = dd;
            if (dd.wifiEnabled == "0") {
                df = {
                    wifiEnabled: dd.wifiEnabled
                }
            }
            var de = cP.extend({
                goformId: "SET_WIFI_INFO"
            }, df);
            return de
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function bY() {
        return bz(arguments, {}, db, dc, null, false);

        function db(de, dd) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_server,alk_vpn_type,alk_vpn_user,alk_vpn_passwd,alk_vpn_encrypt,alk_vpn_status,vpn_channel,alk_vpn_l2tp_server,alk_vpn_l2tp_channel,alk_vpn_l2tp_user,alk_vpn_l2tp_passwd"
            }
        }

        function dc(de) {
            if (de) {
                if (de.alk_vpn_type == "pptp") {
                    var dd = {
                        alk_vpn_type: de.alk_vpn_type,
                        alk_vpn_server: de.alk_vpn_server,
                        vpn_channel: de.vpn_channel,
                        alk_vpn_user: de.alk_vpn_user,
                        alk_vpn_passwd: de.alk_vpn_passwd,
                        alk_vpn_encrypt: de.alk_vpn_encrypt,
                        alk_vpn_status: de.alk_vpn_status
                    }
                } else {
                    var dd = {
                        alk_vpn_type: de.alk_vpn_type,
                        alk_vpn_server: de.alk_vpn_l2tp_server,
                        vpn_channel: de.alk_vpn_l2tp_channel,
                        alk_vpn_user: de.alk_vpn_l2tp_user,
                        alk_vpn_passwd: de.alk_vpn_l2tp_passwd,
                        alk_vpn_encrypt: de.alk_vpn_encrypt,
                        alk_vpn_status: de.alk_vpn_status
                    }
                }
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function ar() {
        return bz(arguments, {}, db, dc, null, false);

        function db(de, dd) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_server,alk_vpn_type,alk_vpn_user,alk_vpn_passwd,alk_vpn_encrypt,alk_vpn_status,vpn_channel"
            }
        }

        function dc(de) {
            if (de) {
                var dd = {
                    alk_vpn_server: de.alk_vpn_server,
                    vpn_channel: de.vpn_channel,
                    alk_vpn_user: de.alk_vpn_user,
                    alk_vpn_passwd: de.alk_vpn_passwd,
                    alk_vpn_encrypt: de.alk_vpn_encrypt,
                    alk_vpn_status: de.alk_vpn_status
                };
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function c9() {
        return bz(arguments, {}, db, dc, null, false);

        function db(de, dd) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_status,alk_vpn_l2tp_server,alk_vpn_l2tp_channel,alk_vpn_l2tp_user,alk_vpn_l2tp_passwd"
            }
        }

        function dc(de) {
            if (de) {
                var dd = {
                    alk_vpn_server: de.alk_vpn_l2tp_server,
                    vpn_channel: de.alk_vpn_l2tp_channel,
                    alk_vpn_user: de.alk_vpn_l2tp_user,
                    alk_vpn_passwd: de.alk_vpn_l2tp_passwd,
                    alk_vpn_status: de.alk_vpn_status
                };
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function co() {
        return bz(arguments, {}, db, dc, null, true);

        function db(df, dd) {
            var de = {};
            de.goformId = "ALK_VPN_SET";
            de.vpn_server = df.alk_vpn_server;
            de.vpn_type = df.alk_vpn_type;
            de.vpn_user = df.alk_vpn_user;
            de.vpn_passwd = df.alk_vpn_passwd;
            de.vpn_channel = df.vpn_channel;
            de.vpn_encrypt = df.alk_vpn_encrypt;
            return de
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function bw() {
        return bz(arguments, {}, db, dc, null, true);

        function db(dd, de) {
            var df = {};
            df.goformId = "ALK_VPN_CONNECT";
            return df
        }

        function dc(dd) {
            if (dd) {
                return dd
            } else {
                return V
            }
        }
    }

    function y() {
        return bz(arguments, {}, dc, dd, null, true);

        function dc(de, df) {
            var dg = {};
            dg.goformId = "ALK_VPN_DISCONNECT";
            return dg
        }

        function dd(de) {
            if (de) {
                return de
            } else {
                return V
            }
        }

        function db(de) {
            if (de.ppp_status == "ppp_disconnecting") {
                timerInfo.connectStatus = "ppp_disconnecting"
            } else {
                if (de.ppp_status == "ppp_disconnected") {
                    C(db);
                    timerInfo.connectStatus = "ppp_disconnected";
                    callback({
                        result: true,
                        status: timerInfo.connectStatus
                    })
                } else {
                    if (new Date().getTime() - checkPoint < 10000) {
                        timerInfo.connectStatus = "ppp_disconnecting"
                    } else {
                        C(db);
                        callback({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function bP(db, de) {
        return bz(arguments, {}, dc, dd, null, false);

        function dc(df, dg) {
            return {
                multi_data: 1,
                cmd: "alk_eth_mode"
            }
        }

        function dd(df) {
            if (df) {
                return {
                    alk_eth_mode: df.alk_eth_mode
                }
            } else {
                return V
            }
        }
    }

    function bA() {
        return bz(arguments, {}, db, dc, null, true);

        function db(df, dd) {
            var de = {};
            de.goformId = "ALK_SET_NET_MODE";
            de.alk_eth_mode = df.alk_eth_mode;
            return de
        }

        function dc(dd) {
            if (dd && dd.result == "success") {
                return dd
            } else {
                return unknownErrorObject
            }
        }
    }

    function bz(dg, dn, dh, dd, dc, de) {
        var dk = dg[0],
            dm = dg[1],
            df = dg[2];
        var di;
        if (dn && typeof dn.errorType === "string") {
            di = cP.extend(V, dn);
            if (!dm) {
                return di
            }
            dl(di, dm, df)
        } else {
            di = cP.extend({}, dn);
            var dj;
            if (dh) {
                dj = dh(dk, de)
            } else {
                dj = dk
            }
            if (!dm) {
                if (dj && (dj.cmd || dj.goformId)) {
                    var db = cu(dj, de);
                    if (dd) {
                        di = cP.extend({}, dd(db))
                    } else {
                        di = db
                    }
                }
                return di
            } else {
                if (dj && (dj.cmd || dj.goformId)) {
                    c7(dj, function(dp) {
                        if (dd) {
                            di = cP.extend({}, dd(dp))
                        } else {
                            di = cP.extend({}, dp)
                        }
                        if (!dj.notCallback) {
                            dl(di, dm, df)
                        }
                    }, function() {
                        if (dc) {
                            di = cP.extend(V, dc)
                        } else {
                            di = cP.extend(V, {
                                errorType: "Unknown"
                            })
                        }
                        dl(di, dm, df)
                    }, de)
                } else {
                    dl(di, dm, df)
                }
            }
        }

        function dl(dp, dr, dq) {
            dq = dq ? dq : dr;
            if (isErrorObject(dp)) {
                switch (dp.errorType) {
                    case "cellularNetworkError":
                    case "deviceError":
                    case "wifiConnectionError":
                        window.receivedNonSpecificError(dp);
                        break;
                    default:
                        dq(dp)
                }
            } else {
                dr(dp)
            }
        }
    }

    function cu(db, dc) {
        return bj(db, null, null, false, dc)
    }

    function c7(dd, db, dc, de) {
        bj(dd, db, dc, true, de)
    }

    function w(db) {
        var dd = /^[A-z0-9]+$/;
        var dc = db.match(dd);
        if (dc == null) {
            return "error"
        } else {
            return db
        }
    }

    function bj(de, dc, dd, dg, df) {
        var db = null;
        cP.ajax({
            type: !!df ? "POST" : "GET",
            url: df ? "/reqproc/proc_post" : de.cmd ? "/reqproc/proc_get" : "/reqproc/proc_post",
            data: de,
            dataType: "json",
            dataFilter: function(data, type) {
                if (de.cmd === "sms_data_total") {
                    data = data.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
                }
                return data;
            },
            async: !!dg,
            cache: false,
            error: function(dh) {
                if (dg) {
                    dd(dh)
                } else {
                    if (dh.status == 200) {
                        db = jQuery.parseJSON("(" + w(dh.responseText) + ")")
                    }
                }
            },
            success: function(dh) {
                if (dg) {
                    dc(dh)
                } else {
                    db = dh
                }
            }
        });
        if (!dg) {
            return db
        }
    }
    var bu = {
        networkType: "",
        signalImg: "0",
        spn_b1_flag: "1",
        spn_name_data: "",
        spn_b2_flag: "1",
        networkOperator: "China Mobile",
        connectStatus: "ppp_disconnected",
        rj45ConnectStatus: "rj45_dead",
        attachedDevices: [],
        ssid1AttachedNum: 0,
        ssid2AttachedNum: 0,
        data_counter: {
            uploadRate: 0,
            downloadRate: 0,
            totalSent: 0,
            totalReceived: 0,
            totalConnectedTime: 0,
            currentSent: 0,
            currentReceived: 0,
            currentConnectedTime: 0,
            monthlySent: 0,
            monthlyReceived: 0,
            monthlyConnectedTime: 0,
            month: ""
        },
        newSmsReceived: false,
        smsReportReceived: false,
        smsUnreadCount: "0",
        isLoggedIn: undefined,
        limitVolumeEnable: false,
        limitVolumeType: "1",
        limitVolumePercent: "100",
        limitVolumeSize: "0",
        allowRoamingUpdate: "0",
        blc_wan_mode: "",
        ap_station_enable: undefined,
        ap_station_mode: undefined,
        dialMode: "",
        ethWanMode: "AUTO",
        fota_user_selector: "",
        defaultWanName: ""
    };
    var V = {
        errorType: "UnknownError",
        errorId: "123",
        errorText: "UnknownError"
    };
    var cO = true;
    return {
        clearRedirectFlag: cJ,
        connect: a7,
        disconnect: P,
        getSIMPhoneBookCapacity: bQ,
        getDevicePhoneBookCapacity: ag,
        getDevicePhoneBooks: c5,
        getSIMPhoneBooks: cI,
        getPhoneBooks: S,
        getPhoneBookReady: ch,
        getPhoneBooksByGroup: bV,
        deletePhoneBooks: bl,
        deleteAllPhoneBooks: aV,
        deleteAllPhoneBooksByGroup: Z,
        savePhoneBook: cH,
        deleteAllMessages: bU,
        deleteMessage: cA,
        setSmsRead: ae,
        sendSMS: aZ,
        saveSMS: aI,
        getSMSReady: aJ,
        getSMSMessages: aL,
        getSMSDeliveryReport: L,
        getSmsCapability: b,
        resetNewSmsReceivedVar: E,
        resetSmsReportReceivedVar: b3,
        getSmsSetting: b1,
        setSmsSetting: aQ,
        getAttachedCableDevices: bF,
        getCurrentlyAttachedDevicesInfo: bq,
        getConnectionInfo: by,
        getRedirectData: aP,
        getLanguage: A,
        setLanguage: k,
        getNetSelectInfo: Q,
        getSecurityInfo: f,
        setSecurityInfo: z,
        getStatusInfo: e,
        getConnectionMode: K,
        setConnectionMode: af,
        getWifiBasic: d,
        setWifiBasic: cf,
        setWifiBasic4SSID2: bK,
        setWifiBasicMultiSSIDSwitch: t,
        getWpsInfo: cc,
        openWps: r,
        getSleepMode: ck,
        setSleepMode: bf,
        getWifiAdvance: cp,
        setWifiAdvance: c1,
        getWifiRange: W,
        setWifiRange: cY,
        getLoginStatus: bd,
        getLoginData: ci,
        login: aO,
        logout: bt,
        changeManageInfo: bX,
        getPinData: cZ,
        enablePin: da,
        disablePin: b0,
        changePin: o,
        enterPIN: J,
        enterPUK: T,
        getLanInfo: bs,
        setLanInfo: cd,
        getApnSettings: l,
        deleteApn: az,
        setDefaultApn: bx,
        addOrEditApn: bo,
        getQuickSettingInfo: a4,
        setQuickSetting4IPv6: c6,
        scanForNetwork: aF,
        setBearerPreference: bJ,
        editHostName: bg,
        getSiteWhiteList: c3,
        removeSiteWhite: F,
        saveSiteWhite: bB,
        setNetwork: bm,
        getUpnpSetting: ak,
        setUpnpSetting: a2,
        getDmzSetting: aA,
        setDmzSetting: cU,
        getDeviceInfo: a9,
        getDeviceInfoLow: cW,
        getPortForward: D,
        setPortForward: ap,
        getPortFilter: be,
        setPortFilterBasic: ai,
        setPortFilter: U,
        deleteFilterRules: aB,
        getPortMap: a8,
        setPortMap: bH,
        enablePortMap: bE,
        deleteMapRules: aY,
        getTrafficAlertInfo: I,
        setTrafficAlertInfo: am,
        getCurrentUpgradeState: bh,
        setUpgradeSelectOp: N,
        addTimerThings: bb,
        removeTimerThings: m,
        getPackSizeInfo: O,
        getMandatory: bk,
        getOTAUpdateSetting: G,
        setOTAUpdateSetting: al,
        getSignalStrength: h,
        getOTAlastCheckTime: c8,
        clearUpdateResult: j,
        refreshAPStationStatus: aa,
        getSntpParams: aq,
        setSntpSetting: g,
        setSNTPDate: b7,
        restoreFactorySettings: ay,
        checkRestoreStatus: ab,
        getSysSecurity: bW,
        setSysSecurity: cE,
        deleteForwardRules: cD,
        enableVirtualServer: aD,
        getSDConfiguration: bS,
        setSdCardMode: cw,
        checkFileExists: M,
        getFileList: ad,
        fileRename: bC,
        getSdMemorySizes: B,
        deleteFilesAndFolders: aW,
        createFolder: H,
        setSdCardSharing: cb,
        setUpdateInfoWarning: c4,
        getUpdateInfoWarning: b2,
        getAPStationBasic: au,
        setAPStationBasic: bc,
        getWdsInfo: bI,
        setWDS: ao,
        addUrlFilterRule: ca,
        getUrlFilterList: bR,
        deleteSelectedRules: cn,
        getMacFilterInfo: b6,
        setMacFilter: aC,
        getFastbootSetting: at,
        setFastbootSetting: bO,
        turnOffDevice: a5,
        restart: ah,
        updateTimerFlag: cO,
        childGroupList: v,
        addChildGroup: cs,
        removeChildGroup: cG,
        checkCurrentUserInChildGroup: s,
        getTimeLimited: b5,
        saveTimeLimited: n,
        getHostNameList: u,
        getHotspotList: cl,
        searchHotspot: an,
        getSearchHotspotList: X,
        saveHotspot: aj,
        deleteHotspot: cV,
        connectHotspot: bG,
        disconnectHotspot: aK,
        getOpMode: cS,
        getRj45PlugState: a3,
        SetOperationMode: bi,
        getPppoeParams: a6,
        setPppoeDialMode: cB,
        getTsw: ct,
        saveTsw: bN,
        trafficCalibration: aN,
        getParams: cm,
        getNewVersionState: Y,
        getUpgradeResult: cC,
        getV4Switch: b4,
        setV4Switch: bL,
        getCellId: aG,
        setCellIdSwitch: bZ,
        getDdnsParams: bT,
        setDDNSForward: aS,
        getUpdateType: cR,
        getCurretnMAC: aR,
        getUSSDResponse: cz,
        USSDReplyCancel: p,
        getNetworkUnlockTimes: cj,
        unlockNetwork: aM,
        getSyslogInfo: x,
        setSysLog: ba,
        getNetInfo: cy,
        getNetBandInfo: q,
        setselectedband: R,
        getVpnSettings: bY,
        setVpnSettings: co,
        getVpnSettings_l2tp: c9,
        getVpnSettings_pptp: ar,
        Vpnconnect: bw,
        VPNdisconnect: y,
        setEth_mode: bA,
        getEth_mode: bP,
        setIMEI: bD,
        setTTL: br,
        setDnsLan: cr,
        getIMEITTL: cF,
        getRebootTimeEnable: av,
        SetRebootTimeEnable: cq,
        getRebootTime: c0,
        getDisconnetReboot: cT,
        SetDisconnetReboot: b9
    }
});
define("adm_lan", "jquery knockout set service".split(" "), function(h, o, d, j) {
    var q = "";

    function b() {
        return j.getLanInfo()
    }

    function f(t) {
        var s = (t - 0).toString(16);
        if (s.length == 1) {
            s = "0" + s
        }
        return s.toUpperCase()
    }

    function r() {
        var t = this;
        var s = b();
        t.dhcpStart = o.observable(s.dhcpStart);
        t.dhcpEnd = o.observable(s.dhcpEnd);
        t.dhcpLease = o.observable(s.dhcpLease);
        t.ipAddress = o.observable(s.ipAddress);
        t.subnetMask = o.observable(s.subnetMask);
        t.dhcpServer = o.observable(s.dhcpServer);
        t.macAddress = o.observable(s.macAddress);
        t.showMacAddress = o.observable(d.SHOW_MAC_ADDRESS);
        t.hasWifi = o.observable(d.HAS_WIFI);
        t.hasUssd = d.HAS_USSD;
        t.hasDdns = d.DDNS_SUPPORT;
        t.hasUpdateCheck = d.HAS_UPDATE_CHECK;
        t.clear = function() {
            clearTimer();
            n();
            clearValidateMsg()
        };
        t.refreshStatus = function() {
            var u = j.getConnectionInfo();
            if (u.connectStatus == "ppp_disconnected") {
                h("input", "#frmLan").each(function() {
                    h(this).attr("disabled", false)
                })
            } else {
                h("input", "#frmLan").each(function() {
                    h(this).attr("disabled", false)
                });
                clearValidateMsg()
            }
        };
        t.saveAct = function() {
            showLoading();
            var u = {
                ipAddress: t.ipAddress(),
                subnetMask: t.subnetMask(),
                dhcpServer: t.dhcpServer(),
                dhcpStart: t.dhcpStart(),
                dhcpEnd: t.dhcpEnd(),
                dhcpLease: t.dhcpLease()
            };
            j.setLanInfo(u, function(v) {
                if (v.result == "success") {
                    successOverlay();
                    t.clear()
                } else {
                    errorOverlay()
                }
            })
        };
        t.save = function() {
            var u = h("#frmLan").serialize();
            if (u == q) {
                showAlert("setting_no_change");
                return false
            }
            if (d.RJ45_SUPPORT) {
                var v = j.getPppoeParams();
                if (l(v.static_wan_ipaddr, t.ipAddress(), t.subnetMask())) {
                    showAlert("lan_tip_staticip_notsame");
                    return false
                }
            }
            showConfirm("lan_confirm_reopen", function() {
                t.saveAct()
            })
        };
        t.refreshStatus();
        t.dhcpServerHandler = function() {
            h("#txtIpAddress").parent().find(".error").hide();
            h("#txtIpAddress").show();
            return true
        };
        addTimeout(function() {
            q = h("#frmLan").serialize()
        }, 500)
    }

    function p(x, v) {
        var t;
        var w = [];
        var u = [];
        var s = "0x";
        for (t = 2, index_tmp = 0; t < 10; t += 2, index_tmp++) {
            w[index_tmp] = "0x" + x.substring(t, t + 2);
            u[index_tmp] = "0x" + v.substring(t, t + 2)
        }
        for (t = 0; t < 4; t++) {
            s = s + f(w[t] & u[t])
        }
        return s - 0
    }
    h.validator.addMethod("dhcp_check", function(u, v, w) {
        var t = w == "start" ? h("#txtDhcpIpPoolStart").val() : h("#txtDhcpIpPoolEnd").val();
        var s = k(h("#txtIpAddress").val(), h("#txtSubnetMask").val(), t);
        return this.optional(v) || s
    });
    h.validator.addMethod("dhcpCompare", function(t, u, v) {
        var s;
        if (v == "#txtDhcpIpPoolStart") {
            s = m(h("#txtIpAddress").val(), h("#txtSubnetMask").val(), h(v).val(), t)
        } else {
            s = m(h("#txtIpAddress").val(), h("#txtSubnetMask").val(), t, h(v).val())
        }
        return s != 1
    });
    h.validator.addMethod("ipRange", function(t, v, w) {
        var u = false;
        if (h("#dhcpEnable").is(":checked")) {
            u = true
        }
        var s = m(t, h("#txtSubnetMask").val(), h("#txtDhcpIpPoolStart").val(), h("#txtDhcpIpPoolEnd").val(), u);
        return s != 2
    });
    h.validator.addMethod("subnetmask_check", function(t, u, v) {
        var s = c(t);
        return this.optional(u) || s
    });

    function l(x, y, t) {
        if (!x || !y || !t) {
            return false
        }
        if (x == y) {
            return true
        }
        var w = [];
        var v = [];
        var s = [];
        ip_array = x.split(".");
        lanIp_array = y.split(".");
        s = t.split(".");
        for (var u = 0; u < ip_array.length; u += 1) {
            w.push(parseInt(s[u]) & parseInt(ip_array[u]));
            v.push(parseInt(s[u]) & parseInt(lanIp_array[u]))
        }
        if (v.join(".") != w.join(".")) {
            return false
        } else {
            return true
        }
    }

    function e(s) {
        return (s == 255 || s == 254 || s == 252 || s == 248 || s == 240 || s == 224 || s == 192 || s == 128 || s == 0)
    }

    function g(v) {
        var u = v.indexOf(".");
        var t = v.indexOf(".", (u + 1));
        var s = v.indexOf(".", (t + 1));
        o_ip = f(v.substring(0, u)) + f(v.substring((u + 1), t)) + f(v.substring((t + 1), s)) + f(v.substring((s + 1), v.length));
        o_ip = "0x" + o_ip;
        return o_ip
    }

    function a(w) {
        var v = w.indexOf(".");
        var u = w.indexOf(".", (v + 1));
        var t = w.indexOf(".", (u + 1));
        var s = w.substring((t + 1), w.length) - 0;
        return s
    }

    function k(s, C, B) {
        var y = g(s);
        var w = a(s);
        var u = g(C);
        var A = a(C);
        var x = g(B);
        var z = a(B);
        var v;
        var t;
        if (p(y, u) != p(x, u)) {
            return false
        }
        v = (w & A);
        t = (w & A) + (255 - A);
        return !(z == v || z == t)
    }

    function c(s) {
        var t = s.split(".");
        if ("0.0.0.0" == s || "255.255.255.255" == s) {
            return false
        }
        if (t.length != 4) {
            return false
        }
        t[0] = parseInt(t[0]);
        t[1] = parseInt(t[1]);
        t[2] = parseInt(t[2]);
        t[3] = parseInt(t[3]);
        if (t[3] != 0) {
            if (t[0] != 255 || t[1] != 255 || t[2] != 255) {
                return false
            } else {
                if (!e(t[3])) {
                    return false
                }
            }
        }
        if (t[2] != 0) {
            if (t[0] != 255 || t[1] != 255) {
                return false
            } else {
                if (!e(t[2])) {
                    return false
                }
            }
        }
        if (t[1] != 0) {
            if (t[0] != 255) {
                return false
            } else {
                if (!e(t[1])) {
                    return false
                }
            }
        }
        if (t[0] != 255) {
            return false
        }
        return true
    }

    function m(u, w, s, t, v) {
        s_startIp = g(s);
        s_endIp = g(t);
        s_lanIp = g(u);
        if (s_startIp > s_endIp) {
            return 1
        }
        if (s_lanIp >= s_startIp && s_lanIp <= s_endIp) {
            return 2
        }
        return 0
    }

    function n() {
        var s = h("#container");
        o.cleanNode(s[0]);
        var t = new r();
        o.applyBindings(t, s[0]);
        addInterval(t.refreshStatus, 1000);
        h("#frmLan").validate({
            submitHandler: function() {
                t.save()
            },
            rules: {
                txtIpAddress: {
                    lanip_check: true,
                    ipRange: true
                },
                txtSubnetMask: {
                    ipv4: true,
                    subnetmask_check: true
                },
                txtDhcpIpPoolStart: {
                    lanip_check: true,
                    dhcp_check: "start",
                    dhcpCompare: "#txtDhcpIpPoolEnd"
                },
                txtDhcpIpPoolEnd: {
                    lanip_check: true,
                    dhcp_check: "end",
                    dhcpCompare: "#txtDhcpIpPoolStart"
                },
                txtDhcpLease: {
                    range: [1, 65535],
                    digits: true
                }
            },
            groups: {
                lanip_check: "txtDhcpIpPoolStart txtDhcpIpPoolEnd"
            },
            errorPlacement: function(u, v) {
                if (v.attr("name") == "txtDhcpLease") {
                    u.insertAfter("#errorHolder")
                } else {
                    if (v.attr("name") == "txtDhcpIpPoolStart") {
                        u.insertAfter("#txtDhcpIpPoolEnd")
                    } else {
                        u.insertAfter(v)
                    }
                }
            }
        })
    }
    return {
        init: n
    }
});
define("adm_others", "jquery knockout set service underscore".split(" "), function(c, a, r, t, s) {
    var o = s.map(r.diconntReboot, function(u) {
        return new Option(u.name, u.value)
    });
    var d = s.map(r.sntpTimeSetMode, function(u) {
        return new Option(u.name, u.value)
    });
    var e = s.map(r.timeZone, function(u) {
        return new Option(u.name, u.value)
    });
    var g = s.map(r.daylightSave, function(u) {
        return new Option(u.name, u.value)
    });
    var j = [];
    var f = [];
    var b = [];
    var l = [];
    var h = [];
    var q = [1, 3, 5, 7, 8, 10, 12];
    var k = [4, 6, 9, 11];

    function p(y, u, x) {
        var w = {};
        for (var v = y; v <= u; v++) {
            w.name = v;
            w.value = v;
            x.push(new Option(w.name, w.value))
        }
    }
    p(2000, 2030, j);
    p(1, 12, f);
    p(0, 23, l);
    p(0, 59, h);

    function n() {
        var B = this;
        var D = false;
        B.fastbootSupport = r.FAST_BOOT_SUPPORT;
        B.turnOffSupport = r.TURN_OFF_SUPPORT;
        B.SNTPSupport = r.HAS_SNTP;
        B.hasUssd = r.HAS_USSD;
        B.hasDdns = r.DDNS_SUPPORT;
        B.hasUpdateCheck = r.HAS_UPDATE_CHECK;
        B.hasUssd = r.HAS_USSD;
        B.hasDdns = r.DDNS_SUPPORT;
        B.selectedType = a.observable(t.getDisconnetReboot().network_detect_switch);
        B.types = a.observableArray(o);
        var v = t.getLanInfo();
        B.dnsIpAddress = a.observable(v.lan_dns_ip);
        B.dnsServer = a.observable(v.lan_dns_mode);
        if (r.HAS_PARENTAL_CONTROL) {
            D = t.checkCurrentUserInChildGroup().result
        }
        B.currentUserInChildGroup = a.observable(D);
        var E = t.getFastbootSetting();
        B.fastbootEnableFlag = a.observable(r.RJ45_SUPPORT ? (E.need_sim_pin != "yes" && t.getRj45PlugState().rj45_plug == "wan_lan_off") : E.need_sim_pin != "yes");
        B.fastbootSetting = a.observable(E.fastbootEnabled);
        var A = t.getRebootTime();
        B.reboottime = a.observable(A.midnight_reboot_hour);
        var F = t.getRebootTimeEnable();
        B.select_reboottime = a.observable(F.midnight_reboot_switch);
        B.saveReboottime = w;
        addInterval(function() {
            B.fastbootEnableFlag(r.RJ45_SUPPORT ? (E.need_sim_pin != "yes" && t.getRj45PlugState().rj45_plug == "wan_lan_off") : E.need_sim_pin != "yes")
        }, 1000);
        B.dnsSave = function() {
            showLoading("waiting");
            var G = {
                lan_dns_ip: B.dnsIpAddress(),
                lan_dns_mode: B.dnsServer()
            };
            t.setDnsLan(G, function(H) {
                if ("success" == H.result) {
                    showConfirm("restart_confirm", function() {
                        restartDevice(t)
                    })
                } else {
                    errorOverlay()
                }
            })
        };
        B.restore = function() {
            showConfirm("restore_confirm", function() {
                showLoading("restoring");
                t.restoreFactorySettings({}, function(G) {
                    if (G && G.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, function(G) {
                    if (isErrorObject(G) && G.errorType == "no_auth") {
                        errorOverlay()
                    }
                })
            })
        };
        B.saveRebootDisconnet = function() {
            var G = {
                network_detect_switch: B.selectedType()
            };
            showLoading();
            t.SetDisconnetReboot(G, function(H) {
                if (H && H.result == "success") {
                    successOverlay();
                    showConfirm("restart_confirm2", function() {
                        restartDevice(t)
                    })
                } else {
                    errorOverlay()
                }
            }, function(H) {
                errorOverlay()
            })
        };
        B.restart = function() {
            showConfirm("restart_confirm", function() {
                restartDevice(t)
            })
        };
        B.saveFastBoot = function() {
            showLoading();
            var G = {
                fastbootEnabled: B.fastbootSetting(),
                need_hard_reboot: E.need_hard_reboot
            };
            t.setFastbootSetting(G, function(H) {
                if (H.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        };

        function w() {
            showLoading();
            var G = {
                midnight_reboot_switch: B.select_reboottime(),
                midnight_reboot_hour: parseInt(B.reboottime())
            };
            t.SetRebootTimeEnable(G, function(H) {
                if (H.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        }
        B.turnoff = function() {
            showConfirm("turnoff_confirm", function() {
                showLoading("turnoff");
                t.turnOffDevice({}, function(G) {
                    if (G && G.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, c.noop)
            })
        };
        t.setSNTPDate({
            goformId: "SNTP_Getdatastatic"
        });
        var B = this;
        var y = t.getSntpParams();
        globalTime = new Date(parseInt(y.sntp_year, 10), parseInt(y.sntp_month, 10) - 1, parseInt(y.sntp_day, 10), parseInt(y.sntp_hour, 10), parseInt(y.sntp_minute, 10), parseInt(y.sntp_second, 10));
        B.day = a.observable();
        B.localTime = a.observable();
        B.timeSetModes = a.observableArray(d);
        B.isManualSetTime = a.observable(false);
        B.isAutoSntpTime = a.observable(false);
        B.currentMode = a.observable(y.sntp_time_set_mode);
        x();
        B.changeSetTimeMode = function() {
            x()
        };
        B.currentYear = a.observable(parseInt(y.sntp_year, 10));
        B.currentMonth = a.observable(parseInt(y.sntp_month, 10));
        B.currentDate = a.observable(parseInt(y.sntp_day, 10));
        B.currentHour = a.observable(parseInt(y.sntp_hour, 10));
        B.currentMinute = a.observable(parseInt(y.sntp_minute, 10));
        B.years = a.observableArray(j);
        B.months = a.observableArray(f);
        B.initDateList = function() {
            z();
            B.dates(b)
        };
        z();
        B.dates = a.observableArray(b);
        B.hours = a.observableArray(l);
        B.minutes = a.observableArray(h);
        var C = s.map(y.sntp_servers, function(G) {
            return new Option(G.name, G.value)
        });
        B.serverList = a.observableArray(C);
        B.currentServer0 = a.observable(y.sntp_server0);
        B.currentServer1 = a.observable(y.sntp_server1);
        B.currentServer2 = a.observable(y.sntp_server2);
        B.customServer0 = a.observable(y.sntp_other_server0);
        B.customServer1 = a.observable(y.sntp_other_server1);
        B.customServer2 = a.observable(y.sntp_other_server2);
        B.isOther0 = a.observable(false);
        B.isOther1 = a.observable(false);
        B.isOther2 = a.observable(false);
        u();
        B.changeServerSelect = function() {
            u()
        };
        B.timeZones = a.observableArray(e);
        B.currentTimeZone = a.observable(y.sntp_timezone + "_" + y.sntp_timezone_index);
        B.daylightSaves = a.observableArray(g);
        B.currentDaylightSave = a.observable(y.sntp_dst_enable);
        B.updateCurrentTime = function() {
            var G = globalTime.getDay();
            switch (G) {
                case 6:
                    B.day(c.i18n.prop("saturday"));
                    break;
                case 5:
                    B.day(c.i18n.prop("friday"));
                    break;
                case 4:
                    B.day(c.i18n.prop("thursday"));
                    break;
                case 3:
                    B.day(c.i18n.prop("wednesday"));
                    break;
                case 2:
                    B.day(c.i18n.prop("tuesday"));
                    break;
                case 1:
                    B.day(c.i18n.prop("monday"));
                    break;
                case 0:
                    B.day(c.i18n.prop("sunday"));
                    break;
                default:
                    break
            }
            var H = globalTime.getFullYear() + "-" + getTwoDigit(globalTime.getMonth() + 1) + "-" + getTwoDigit(globalTime.getDate()) + " " + getTwoDigit(globalTime.getHours()) + ":" + getTwoDigit(globalTime.getMinutes()) + ":" + getTwoDigit(globalTime.getSeconds());
            B.localTime(H);
            globalTime.setTime(globalTime.getTime() + 1000)
        };
        B.apply = function() {
            var H = [];
            for (var G = 0; G < y.sntp_servers.length; G++) {
                H.push(y.sntp_servers[G].value)
            }
            var J = t.getStatusInfo();
            if (!checkConnectedStatus(J.connectStatus, J.rj45ConnectStatus, J.connectWifiStatus) && B.currentMode() == "auto") {
                showAlert("sntp_syn_time_wan_connected");
                return
            }
            showLoading("");
            var I = {
                goformId: "SNTP",
                manualsettime: B.currentMode(),
                sntp_server1_ip: B.currentServer0(),
                sntp_server2_ip: B.currentServer1(),
                sntp_server3_ip: B.currentServer2(),
                sntp_other_server0: B.customServer0(),
                sntp_other_server1: B.customServer1(),
                sntp_other_server2: B.customServer2(),
                timezone: B.currentTimeZone().split("_")[0],
                sntp_timezone_index: B.currentTimeZone().split("_")[1],
                DaylightEnabled: B.currentDaylightSave(),
                time_year: B.currentYear(),
                time_month: B.currentMonth(),
                time_day: B.currentDate(),
                time_hour: B.currentHour(),
                time_minute: B.currentMinute()
            };
            t.setSntpSetting(I, function(K) {
                if (K) {
                    if (K.result == "success" && B.currentMode() == "auto") {
                        successOverlay("sntp_req_success")
                    } else {
                        if (K.result == "processing" && B.currentMode() == "auto") {
                            successOverlay("sntp_processing")
                        } else {
                            t.setSNTPDate({
                                goformId: "SNTP_Getdatastatic"
                            }, function(L) {
                                var M = t.getSntpParams();
                                globalTime = new Date(parseInt(M.sntp_year, 10), parseInt(M.sntp_month, 10) - 1, parseInt(M.sntp_day, 10), parseInt(M.sntp_hour, 10), parseInt(M.sntp_minute, 10), parseInt(M.sntp_second, 10));
                                successOverlay()
                            })
                        }
                    }
                } else {
                    errorOverlay()
                }
            })
        };

        function x() {
            if (B.currentMode() == "manual") {
                B.isManualSetTime(true);
                B.isAutoSntpTime(false)
            } else {
                B.isManualSetTime(false);
                B.isAutoSntpTime(true)
            }
            return true
        }

        function z() {
            b = [];
            if (c.inArray(parseInt(B.currentMonth(), 10), k) != -1) {
                p(1, 30, b)
            } else {
                if (c.inArray(parseInt(B.currentMonth(), 10), q) != -1) {
                    p(1, 31, b)
                } else {
                    if (parseInt(B.currentYear(), 10) % 4 == 0) {
                        p(1, 29, b)
                    } else {
                        p(1, 28, b)
                    }
                }
            }
        }

        function u() {
            B.isOther0(B.currentServer0() == "Other");
            B.isOther1(B.currentServer1() == "Other");
            B.isOther2(B.currentServer2() == "Other");
            !B.isOther0() && c("#sntp_server0").find(".error").hide();
            !B.isOther1() && c("#sntp_server1").find(".error").hide();
            !B.isOther2() && c("#sntp_server2").find(".error").hide()
        }
    }

    function m() {
        var v = new n();
        var u = c("#container")[0];
        a.cleanNode(u);
        a.applyBindings(v, u);
        v.updateCurrentTime();
        addInterval(function() {
            v.updateCurrentTime()
        }, 1000);
        c("#sntpForm").validate({
            submitHandler: function() {
                v.apply()
            },
            rules: {
                sntp_other_server0: "sntp_invalid_server_name",
                sntp_other_server1: "sntp_invalid_server_name",
                sntp_other_server2: "sntp_invalid_server_name"
            }
        });
        c("#frmrebootime").validate({
            submitHandler: function() {
                v.saveReboottime()
            },
            rules: {
                reboottimevalue: "rebootNew_check"
            }
        });
        c("#dnsLan").validate({
            submitHandler: function() {
                v.dnsSave()
            },
            rules: {
                dnsIpAddress: {
                    ip_check: true
                }
            }
        })
    }
    return {
        init: m
    }
});
define("imeistl", "jquery knockout set service underscore".split(" "), function(f, d, c, a, b) {
    function e() {
        var k = this;
        var j = a.getIMEITTL();
        k.imeivalue = d.observable();
        k.TTLNew = d.observable(j.time_to_live);
        k.isDataCard = c.PRODUCT_TYPE == "DATACARD";
        k.hasUpdateCheck = c.HAS_UPDATE_CHECK;
        k.hasUssd = c.HAS_USSD;
        k.hasDdns = c.DDNS_SUPPORT;
        k.IMEINew = d.observable(j.imei);

        function l() {
            showLoading();
            var n = k.IMEINew();
            var m = /^\d{1,}$/;
            var o = new RegExp(m);
            var q = o.test(n);
            if (!q || n.length != 15) {
                errorOverlay();
                return false
            }
            var p = {
                imei_string: k.IMEINew
            };
            a.setIMEI(p, function(r) {
                if (r.result == true) {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        }

        function h() {
            showLoading();
            var m = {
                ttl_value: k.TTLNew()
            };
            a.setTTL(m, function(n) {
                if (n && n.result == true) {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        }
        k.changeImei = l;
        k.changeTTL = h
    }

    function g() {
        var h = f("#container");
        d.cleanNode(h[0]);
        var j = new e();
        d.applyBindings(j, h[0]);
        f("#frmimei").validate({
            submitHandler: function() {
                j.changeImei()
            },
            rules: {
                imeiNewKey: {
                    IMEINew_check: true
                }
            }
        });
        f("#frmttl").validate({
            submitHandler: function() {
                j.changeTTL()
            },
            rules: {
                txtttlvalue: {
                    ttl_check: true
                }
            }
        })
    }
    return {
        init: g
    }
});
define("adm_management", "jquery knockout set service underscore CryptoJS".split(" "), function(f, e, d, a, c, b) {
    function g() {
        var l = this;
        l.currentValue = e.observable();
        l.newValue = e.observable();
        l.confirmValue = e.observable();

        function k() {
            var s = {};
            if (d.PASSWORD_ENCODE) {
                s.oldValue = l.currentValue();
                s.newValue = l.newValue()
            } else {
                var r = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,32}");
                if (!r.test(l.newValue())) {
                    showConfirm("password_note_too_low", function() {
                        var v = a.getDeviceInfoLow();
                        var w = b.enc.Latin1.parse(v.skey);
                        var t = b.enc.Latin1.parse(v.siv);
                        var x = b.AES.encrypt(l.currentValue(), w, {
                            iv: t,
                            mode: b.mode.CBC,
                            padding: b.pad.ZeroPadding
                        }).toString();
                        var u = b.AES.encrypt(l.newValue(), w, {
                            iv: t,
                            mode: b.mode.CBC,
                            padding: b.pad.ZeroPadding
                        }).toString();
                        s.oldValue = x;
                        s.newValue = u;
                        showLoading();
                        a.changeManageInfo(s, function(y) {
                            l.cancel();
                            if (y && y.result == true) {
                                successOverlay()
                            } else {
                                if (y && y.errorType == "badPassword") {
                                    hideLoading();
                                    showAlert("current_password_error", function() {
                                        f("#txtCurrent").focus()
                                    })
                                } else {
                                    errorOverlay()
                                }
                            }
                        })
                    });
                    return
                }
                var o = a.getDeviceInfoLow();
                var p = b.enc.Latin1.parse(o.skey);
                var m = b.enc.Latin1.parse(o.siv);
                var q = b.AES.encrypt(l.currentValue(), p, {
                    iv: m,
                    mode: b.mode.CBC,
                    padding: b.pad.ZeroPadding
                }).toString();
                var n = b.AES.encrypt(l.newValue(), p, {
                    iv: m,
                    mode: b.mode.CBC,
                    padding: b.pad.ZeroPadding
                }).toString();
                s.oldValue = q;
                s.newValue = n
            }
            showLoading();
            a.changeManageInfo(s, function(t) {
                l.cancel();
                if (t && t.result == true) {
                    successOverlay()
                } else {
                    if (t && t.errorType == "badPassword") {
                        hideLoading();
                        showAlert("current_password_error", function() {
                            f("#txtCurrent").focus()
                        })
                    } else {
                        errorOverlay()
                    }
                }
            })
        }

        function j() {
            l.currentValue("");
            l.newValue("");
            l.confirmValue("")
        }
        l.cancel = j;
        l.changeValue = k
    }

    function h() {
        var j = f("#container");
        e.cleanNode(j[0]);
        var k = new g();
        e.applyBindings(k, j[0]);
        f("#frmPassword").validate({
            submitHandler: function() {
                k.changeValue()
            },
            rules: {
                txtCurrent: "manage_info_check",
                txtNew: "manage_info_check",
                txtConfirm: {
                    equalTo: "#txtNew"
                }
            }
        })
    }
    return {
        init: h
    }
});
define("adm_pin", "jquery knockout set service".split(" "), function(g, d, c, b) {
    var e = {
        common: 0,
        requirePin: 1,
        modifyPin: 2,
        requirePuk: 3,
        destroyed: 4
    };
    var f = {
        enable: "1",
        disable: "0"
    };

    function a() {
        var q = this;
        var n = b.getPinData();
        q.isDataCard = c.PRODUCT_TYPE == "DATACARD";
        q.originPinStatus = d.observable(n.pin_status);
        q.pinStatus = d.observable(n.pin_status);
        q.pinNumber = d.observable(n.pinnumber);
        q.pukNumber = d.observable(n.puknumber);
        q.currentPin = d.observable();
        q.newPin = d.observable();
        q.confirmPin = d.observable();
        q.puk = d.observable();
        q.pageState = d.observable();
        q.operateSuccessFlag = true;
        q.callback = s;

        function s(u) {
            if (u && u.result == true) {
                q.operateSuccessFlag = true;
                successOverlay()
            } else {
                q.operateSuccessFlag = false;
                if (q.pinNumber() == 2) {
                    showAlert("last_enter_pin")
                } else {
                    if (q.pukNumber() == 2) {
                        showAlert("last_enter_puk")
                    } else {
                        errorOverlay()
                    }
                }
            }
            h(q)
        }

        function o() {
            if (q.isConnectedNetWork()) {
                showAlert("cannot_operate_when_connected");
                return
            }
            if (q.pageState() == e.common) {
                return
            }
            var u = {
                oldPin: q.currentPin(),
                newPin: q.newPin()
            };
            showLoading();
            if (q.pageState() == e.modifyPin) {
                b.changePin(u, q.callback)
            } else {
                if (q.pageState() == e.requirePuk) {
                    u = {
                        PinNumber: q.newPin(),
                        PUKNumber: q.puk()
                    };
                    b.enterPUK(u, q.callback)
                } else {
                    if (q.pinStatus() == f.enable) {
                        b.enablePin(u, q.callback)
                    } else {
                        b.disablePin(u, q.callback)
                    }
                }
            }
        }

        function r() {
            q.pageState(e.common);
            q.pinStatus(q.originPinStatus());
            q.clear()
        }

        function l() {
            q.confirmPin("");
            q.currentPin("");
            q.newPin("");
            q.puk("");
            clearValidateMsg()
        }

        function k(u) {
            if (u.pinnumber > 0) {
                if (q.operateSuccessFlag) {
                    q.cancel()
                } else {
                    q.clear()
                }
            } else {
                q.clear();
                if (u.puknumber > 0) {
                    q.pageState(e.requirePuk)
                } else {
                    q.pageState(e.destroyed)
                }
            }
        }

        function p() {
            if (q.isConnectedNetWork()) {
                showAlert("cannot_operate_when_connected");
                return
            }
            q.pinStatus(q.originPinStatus());
            q.pageState(e.modifyPin);
            q.clear()
        }

        function m() {
            if (q.isConnectedNetWork()) {
                g("#frmPin :input").each(function() {
                    disableBtn(g(this))
                });
                clearValidateMsg()
            } else {
                g("#frmPin :input").each(function() {
                    if (this.id == "txtPin" || this.id == "btnPinApply") {
                        if (q.pageState() == e.common) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    if (this.id == "btnModifyPin") {
                        if (q.originPinStatus() != f.enable) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    if (this.id == "pinEnable" || this.id == "pinDisable") {
                        if (q.pageState() == e.modifyPin) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    enableBtn(g(this))
                })
            }
        }

        function t() {
            var u = b.getConnectionInfo();
            return u.connectStatus == "ppp_connected"
        }

        function j() {
            if (q.pinStatus() == q.originPinStatus()) {
                q.pageState(e.common)
            } else {
                q.pageState(e.requirePin)
            }
            q.clear()
        }
        q.changePin = o;
        q.cancel = r;
        q.clear = l;
        q.computePageState = k;
        q.computePageState(n);
        q.displayModifyPinPage = p;
        q.fixPageEnable = m;
        q.isConnectedNetWork = t;
        q.pinStatusChangeEvent = d.dependentObservable(j, this)
    }

    function h(m) {
        var k = m;
        if (k) {
            var l = b.getPinData();
            k.originPinStatus(l.pin_status);
            k.pinNumber(l.pinnumber);
            k.pukNumber(l.puknumber);
            k.computePageState(l)
        } else {
            k = new a();
            addInterval(function() {
                k.fixPageEnable()
            }, 1000)
        }
        var j = g("#container")[0];
        d.cleanNode(j);
        d.applyBindings(k, j);
        k.fixPageEnable();
        g("#frmPin").validate({
            submitHandler: function() {
                k.changePin()
            },
            rules: {
                txtPuk: "puk_check",
                txtPin: "pin_check",
                txtNewPin: "pin_check",
                txtConfirmPin: {
                    equalToPin: "#txtNewPin"
                }
            }
        })
    }
    return {
        init: h
    }
});
define("adm_quick_set", "jquery knockout set service underscore CryptoJS".split(" "), function(g, o, c, k, m, l) {
    var a = {
        ok: 0,
        wps_on: 1,
        wifi_off: 2
    };
    var h = {
        auto: "auto",
        manual: "manual"
    };
    var j = 1;
    var b = 5;

    function d() {
        return m.map(c.APN_AUTH_MODES, function(p) {
            return new Option(p.name, p.value)
        })
    }
    var e = m.map(c.WIFI_WEP_SUPPORT ? c.AUTH_MODES_WEP : c.AUTH_MODES, function(p) {
        return new Option(p.name, p.value)
    });

    function f() {
        var K = this;
        var q = k.getQuickSettingInfo();
        K.currentStep = o.observable(j);
        K.ipType = o.observable(q.pdp_type == "IP" ? "IP" : q.ipv6_pdp_type);
        K.supportIPv6 = c.IPV6_SUPPORT;
        K.supportIpv4AndIpv6 = c.IPV4_AND_V6_SUPPORT;
        K.wpsFlag = o.observable(q.WscModeOption);

        function H() {
            return (q.apn_index < c.defaultApnSize || q.ppp_status == "ppp_connected" || q.ppp_status == "ppp_connecting")
        }

        function p() {
            return (q.ppp_status == "ppp_connected" || q.ppp_status == "ppp_connecting" || (!K.profileName() && K.apnMode() == h.auto))
        }

        function F() {
            var O = q["APN_configtmp" + q.apn_index];
            var N = q["ipv6_APN_configtmp" + q.apn_index];
            var M = [];
            var L = [];
            if (O) {
                M = O.split("($)")
            }
            if (N) {
                L = N.split("($)")
            }
            return {
                m_profile_name: M[0],
                wan_apn: M[1],
                ppp_auth_mode: M[4] == "" || typeof(M[4]) == "undefined" ? "" : M[4].toLowerCase(),
                ppp_username: M[5],
                ppp_passtmp: M[6],
                pdp_type: M[7],
                ipv6_wan_apn: L[1],
                ipv6_ppp_auth_mode: typeof(L[4]) == "undefined" || L[4] == "" ? "" : L[4].toLowerCase(),
                ipv6_ppp_username: L[5],
                ipv6_ppp_passtmp: L[6],
                ipv6_pdp_type: L[7]
            }
        }
        K.currAPN = o.computed(F);
        K.apn = o.observable(K.currAPN().wan_apn);
        K.ipv6_apn = o.observable(K.currAPN().ipv6_wan_apn);
        K.ipv6_selectedAuthMode = o.observable(K.currAPN().ipv6_ppp_auth_mode);
        K.ipv6_username = o.observable(K.currAPN().ipv6_ppp_username);
        K.ipv6_password = o.observable(K.currAPN().ipv6_ppp_passtmp);
        K.profileName = o.observable(K.currAPN().m_profile_name);
        K.selectedAuthMode = o.observable(K.currAPN().ppp_auth_mode);
        K.username = o.observable(K.currAPN().ppp_username);
        K.password = o.observable(K.currAPN().ppp_passtmp);
        K.transAPN = o.observable("apn_ipv4_apn");
        K.transAPNIPv6 = o.observable("apn_ipv6_apn");
        K.transAuthMode = o.observable("apn_authentication_ipv4");
        K.transAuthModeIPv6 = o.observable("apn_authentication_ipv6");
        K.transUserName = o.observable("apn_user_name_ipv4");
        K.transPassword = o.observable("apn_password_ipv4");
        K.transUserNameIPv6 = o.observable("apn_user_name_ipv6");
        K.transPasswordIPv6 = o.observable("apn_password_ipv6");
        K.apnDisabled = o.computed(H);
        K.apnMode = o.observable(q.apn_mode);
        K.apnModeDisabled = o.computed(p);
        K.authModes = o.observableArray(d());
        if (K.ipType() == "IPv6") {
            K.showIPv4 = false;
            K.showIPv6 = true;
            K.transAPNIPv6("apn");
            K.transAuthModeIPv6("apn_authentication");
            K.transUserNameIPv6("apn_user_name");
            K.transPasswordIPv6("apn_password")
        } else {
            if (c.IPV4_AND_V6_SUPPORT && K.ipType() == "IPv4v6") {
                K.showIPv4 = true;
                K.showIPv6 = true
            } else {
                if (K.ipType() == "IP" || K.ipType() == "IPv4") {
                    K.showIPv4 = true;
                    K.showIPv6 = false;
                    K.transAPN("apn");
                    K.transAuthMode("apn_authentication");
                    K.transUserName("apn_user_name");
                    K.transPassword("apn_password")
                } else {
                    K.showIPv4 = true;
                    K.showIPv6 = false;
                    K.transAPN("apn");
                    K.transAuthMode("apn_authentication");
                    K.transUserName("apn_user_name");
                    K.transPassword("apn_password")
                }
            }
        }
        K.wifiDisabled = (q.wifi_cur_state != "1");
        K.ssid = o.observable(q.SSID1);
        K.broadcast = o.observable(q.HideSSID);
        K.hasWifiWep = c.WIFI_WEP_SUPPORT;
        K.hasWifiWpa3 = c.WIFI_WAP3_SUPPORT;
        K.hasWifiWpa23 = c.WIFI_WPA2_WAP3_SUPPORT;
        K.securityModes = o.observableArray(e);
        K.selectedSecurityMode = o.observable(q.AuthMode);
        K.WPAKey = o.observable(q.WPAPSK1);
        K.apnMode_display = o.observable("");
        K.apnMode_trans = o.computed(I);
        K.selectedAuthMode_display = o.computed(y);
        K.ipv6_selectedAuthMode_display = o.computed(C);
        K.showWifiPassword = o.observable(false);
        K.showWifiPasswordHandler = r;
        var v = k.getWifiAdvance();
        K.adBand = o.observable(v.wifiBand);
        K.adMode = o.observable(v.mode);
        K.encryptType = o.observable(q.EncrypType);
        K.keyID = o.observable(q.DefaultKeyID);
        K.wepPassword = o.observable("");
        K.getWepPassword = z;
        K.wepPassword(K.getWepPassword());
        K.profileChangeHandler = G;
        K.broadcast_display = o.observable("");
        K.broadcast_trans = o.computed(w);
        K.selectedSecurityMode_display = o.observable();
        K.selectedSecurityMode_trans = o.computed(B);
        K.callback = u;
        K.next = E;
        K.previous = D;
        K.save = J;

        function I() {
            if (h.auto == K.apnMode()) {
                K.apnMode_display(g.i18n.prop("apn_auto_apn"));
                return "apn_auto_apn"
            } else {
                K.apnMode_display(g.i18n.prop("apn_manual_apn"));
                return "apn_manual_apn"
            }
        }

        function w() {
            if ("0" == K.broadcast()) {
                K.broadcast_display(g.i18n.prop("enable"));
                return "enable"
            } else {
                K.broadcast_display(g.i18n.prop("disable"));
                return "disable"
            }
        }

        function E() {
            var L = K.currentStep();
            var M = K.currentStep() + 1;
            s(M);
            if (L == 1 && K.apnMode() == h.auto) {
                M = K.currentStep() + 1;
                s(M)
            }
        }

        function D() {
            var L = K.currentStep();
            var M = K.currentStep() - 1;
            s(M);
            if (L == 3 && K.apnMode() == h.auto) {
                M = K.currentStep() - 1;
                s(M)
            }
        }

        function J() {
            var M = function() {
                t()
            };
            var L = x();
            if (L == a.wifi_off) {
                showConfirm("quick_setting_wifi_disable_confirm", M)
            } else {
                if (L == a.wps_on) {
                    showAlert("wps_on_info")
                } else {
                    showConfirm("quick_setting_param_changed_confirm", M)
                }
            }
        }

        function u(L) {
            if (L.result == "success") {
                successOverlay();
                location.hash = "#network_choose"
            } else {
                errorOverlay()
            }
        }

        function s(L) {
            if (L > b) {
                L = b
            } else {
                if (L < j) {
                    L = j
                }
            }
            K.currentStep(L);
            return true
        }

        function C() {
            var L = K.ipv6_selectedAuthMode();
            return A(L)
        }

        function A(M) {
            for (var L = 0; L < c.APN_AUTH_MODES.length; L++) {
                if (M == c.APN_AUTH_MODES[L].value) {
                    return c.APN_AUTH_MODES[L].name
                }
            }
        }

        function z() {
            return K.keyID() == "3" ? q.Key4Str1 : (K.keyID() == "2" ? q.Key3Str1 : K.keyID() == "1" ? q.Key2Str1 : q.Key1Str1)
        }

        function x() {
            var L = k.getWpsInfo();
            if (L.radioFlag == "0") {
                return a.wifi_off
            } else {
                if (L.wpsFlag == "1") {
                    return a.wps_on
                }
            }
            return a.ok
        }

        function G(M, L) {
            g("#pwdWepKey").parent().find("label[class='error']").hide();
            K.wepPassword(K.getWepPassword());
            return true
        }

        function t() {
            showLoading();
            var N = c.IPV4V6_SUPPORT && K.currAPN().pdp_type == "IPv4v6";
            var O = "";
            if (c.PASSWORD_ENCODE) {
                O = K.WPAKey()
            } else {
                var M = k.getDeviceInfoLow();
                var P = l.enc.Latin1.parse(M.skey);
                var L = l.enc.Latin1.parse(M.siv);
                O = l.AES.encrypt(K.WPAKey(), P, {
                    iv: L,
                    mode: l.mode.CBC,
                    padding: l.pad.ZeroPadding
                }).toString()
            }
            var Q = {
                apn_index: q.apn_index,
                apnMode: K.apnMode(),
                Encryption_Mode_hid: K.selectedSecurityMode(),
                ipv6_ppp_auth_mode: N ? K.selectedAuthMode() : K.ipv6_selectedAuthMode(),
                ipv6_ppp_username: N ? K.username() : K.ipv6_username(),
                ipv6_ppp_passtmp: N ? K.password() : K.ipv6_password(),
                ipv6_wan_apn: N ? K.apn() : K.ipv6_apn(),
                pdp_type: K.ipType(),
                ppp_auth_mode: K.selectedAuthMode(),
                ppp_username: K.username(),
                ppp_passtmp: K.password(),
                profile_name: K.profileName(),
                security_shared_mode: "NONE",
                SSID_Broadcast: K.broadcast(),
                SSID_name: K.ssid(),
                wan_apn: K.apn(),
                wep_default_key: 0,
                WPA_ENCRYPTION_hid: K.selectedSecurityMode() == "OPEN" ? "NONE" : K.selectedSecurityMode() == "WPA2PSK" ? 1 : 2,
                WPA_PreShared_Key: O
            };
            Q.wep_default_key = K.keyID();
            if (K.encryptType() == "SHARED" || K.selectedSecurityMode() == "WEP") {
                Q.security_shared_mode = "WEP";
                Q.wep_key_1 = q.Key1Str1;
                Q.wep_key_2 = q.Key2Str1;
                Q.wep_key_3 = q.Key3Str1;
                Q.wep_key_4 = q.Key4Str1;
                var R = "0";
                if (K.wepPassword().length == "5" || K.wepPassword().length == "13") {
                    R = "1"
                } else {
                    R = "0"
                }
                if (K.keyID() == "3") {
                    Q.wep_key_4 = K.wepPassword();
                    Q.WEP4Select = R
                } else {
                    if (K.keyID() == "2") {
                        Q.wep_key_3 = K.wepPassword();
                        Q.WEP3Select = R
                    } else {
                        if (K.keyID() == "1") {
                            Q.wep_key_2 = K.wepPassword();
                            Q.WEP2Select = R
                        } else {
                            Q.wep_key_1 = K.wepPassword();
                            Q.WEP1Select = R
                        }
                    }
                }
            } else {
                if (K.encryptType() == "WPAPSKWPA2PSK") {
                    Q.security_shared_mode = "NONE"
                } else {
                    Q.security_shared_mode = "NONE"
                }
            }
            k.setQuickSetting4IPv6(Q, K.callback)
        }

        function y() {
            var L = K.selectedAuthMode();
            return A(L)
        }

        function B() {
            var N = K.selectedSecurityMode();
            var M = c.WIFI_WEP_SUPPORT ? c.AUTH_MODES_WEP : c.AUTH_MODES;
            for (var L = 0; L < M.length; L++) {
                if (N == M[L].value) {
                    K.selectedSecurityMode_display(g.i18n.prop("security_mode_" + M[L].value));
                    return "security_mode_" + M[L].value
                }
            }
        }

        function r() {
            g("#pwdWepKey").parent().find(".error").hide();
            g("#codeWPAKey").parent().find(".error").hide();
            var L = g("#showWifiPassword:checked");
            if (L && L.length == 0) {
                K.showWifiPassword(true)
            } else {
                K.showWifiPassword(false)
            }
        }
    }

    function n() {
        var p = g("#container");
        o.cleanNode(p[0]);
        var q = new f();
        o.applyBindings(q, p[0]);
        g("#quickSettingForm").validate({
            submitHandler: function() {
                if (q.currentStep() < 5) {
                    q.next()
                } else {
                    q.save()
                }
            },
            rules: {
                txtAPN: "apn_check",
                txtIPv6APN: "apn_check",
                txtSSID: "ssid",
                pwdWepKey: {
                    wifi_wep_password_check: true,
                    wifi_password_check: true
                },
                txtWepKey: {
                    wifi_wep_password_check: true,
                    wifi_password_check: true
                },
                txtWPAKey: "wifi_password_check",
                codeWPAKey: "wifi_password_check",
                txtUserName: "ppp_username_check",
                txtIPv6UserName: "ppp_username_check",
                txtSecretCode: "ppp_secretcode_check",
                txtIPv6SecretCode: "ppp_secretcode_check"
            },
            errorPlacement: function(r, s) {
                var t = s.attr("id");
                if (t == "pwdWepKey" || t == "txtWepKey") {
                    r.insertAfter("#lblShowWepPassword")
                } else {
                    if (t == "txtWPAKey" || t == "codeWPAKey") {
                        r.insertAfter("#lblShowWifiPassword")
                    } else {
                        r.insertAfter(s)
                    }
                }
            }
        })
    }
    return {
        init: n
    }
});
define("main", "set service knockout underscore jquery statusBar echarts".split(" "), function(k, f, e, l, h, g, c) {
    var d = {
        color: ["red", "red", "red", "red", "red"],
        series: [{
            name: "��������",
            type: "pie",
            radius: ["0", "72"],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [],
            selectedOffset: 3
        }],
        animation: false,
        title: {
            text: "",
            x: "center",
            y: "center",
            itemGap: 0,
            textStyle: {
                color: "#FFF",
                fontFamily: "΢���ź�",
                fontSize: 20,
                fontWeight: "bolder"
            },
            subtextStyle: {
                color: "#FFF",
                fontFamily: "΢���ź�",
                fontSize: 16,
                fontWeight: "bolder"
            }
        },
        tooltip: {
            formatter: "{b}"
        }
    };
    var m = window.language;
    var a = 0;
    var j = null;
    var b = {
        CONNECTED: 1,
        DISCONNECTED: 2,
        CONNECTING: 3,
        DISCONNECTING: 4
    };

    function o() {
        a = 0;
        n.oldUsedData = null;
        n.oldAlarmData = null;
        j = c.init(h("#traffic_graphic")[0]);
        var q = h("#container")[0];
        e.cleanNode(q);
        var r = new p();
        e.applyBindings(r, q);
        var t = f.getLoginData();
        var s = t.psw_changed;
        if (s != "1") {
            showConfirm("password_note_first_change", function() {
                window.location.hash = "#pwd_mode"
            });
            return
        }
    }
    var n = {
        initStatus: null,
        initShownStatus: function(q) {
            this.initStatus = {};
            var r = q.ipv6PdpType.toLowerCase().indexOf("v6") > 0;
            if (k.RJ45_SUPPORT) {
                var s = checkCableMode(q.blc_wan_mode);
                if (s) {
                    this.initStatus.showIpv6WanIpAddr = false;
                    this.initStatus.showIpv4WanIpAddr = true
                } else {
                    if (k.IPV6_SUPPORT) {
                        if (q.pdpType == "IP") {
                            this.initStatus.showIpv6WanIpAddr = false;
                            this.initStatus.showIpv4WanIpAddr = true
                        } else {
                            if (r) {
                                if (q.ipv6PdpType == "IPv6") {
                                    this.initStatus.showIpv6WanIpAddr = true;
                                    this.initStatus.showIpv4WanIpAddr = false
                                } else {
                                    this.initStatus.showIpv6WanIpAddr = true;
                                    this.initStatus.showIpv4WanIpAddr = true
                                }
                            }
                        }
                    } else {
                        this.initStatus.showIpv6WanIpAddr = false;
                        this.initStatus.showIpv4WanIpAddr = true
                    }
                }
            } else {
                if (k.IPV6_SUPPORT) {
                    if (q.pdpType == "IP") {
                        this.initStatus.showIpv6WanIpAddr = false;
                        this.initStatus.showIpv4WanIpAddr = true
                    } else {
                        if (r) {
                            if (q.ipv6PdpType == "IPv6") {
                                this.initStatus.showIpv6WanIpAddr = true;
                                this.initStatus.showIpv4WanIpAddr = false
                            } else {
                                this.initStatus.showIpv6WanIpAddr = true;
                                this.initStatus.showIpv4WanIpAddr = true
                            }
                        }
                    }
                } else {
                    this.initStatus.showIpv6WanIpAddr = false;
                    this.initStatus.showIpv4WanIpAddr = true
                }
            }
        },
        wanIpGet: function(r) {
            var q = {
                wanIpAddress: "",
                ipv6WanIpAddress: ""
            };
            q.wanIpAddress = verifyDeviceInfo(r.wanIpAddress);
            q.ipv6WanIpAddress = verifyDeviceInfo(r.ipv6WanIpAddress);
            return q
        },
        cachedAPStationBasic: null,
        cachedConnectionMode: null,
        getCanConnectNetWork: function(s) {
            var q = f.getStatusInfo();
            if (q.simStatus != "modem_init_complete") {
                return false
            }
            var r = q.networkType.toLowerCase();
            if (r == "searching") {
                return false
            }
            if (r == "" || r == "limited service") {
                r = "limited_service"
            }
            if (r == "no service") {
                r = "no_service"
            }
            if (r == "limited_service" || r == "no_service") {
                if (s.cStatus() != b.CONNECTED) {
                    return false
                }
            }
            if (k.AP_STATION_SUPPORT) {
                if (q.connectWifiStatus == "connect") {
                    if (q.ap_station_mode == "wifi_pref") {
                        return false
                    }
                }
            }
            return true
        },
        doConnect: function() {
            showLoading("connecting");
            f.connect({}, function(q) {
                if (q.result) {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        },
        refreshHomeData: function(r) {
            var q = f.getConnectionInfo();
            r.connectStatus(q.connectStatus);
            r.canConnect(this.getCanConnectNetWork(r));
            r.networkType(n.getNetworkType(q.networkType));
            if (q.connectStatus == "ppp_connected") {
                r.current_Flux(transUnit(parseInt(q.data_counter.currentReceived, 10) + parseInt(q.data_counter.currentSent, 10), false));
                r.connected_Time(transSecond2Time(q.data_counter.currentConnectedTime));
                r.up_Speed(transUnit(q.data_counter.uploadRate, true));
                r.down_Speed(transUnit(q.data_counter.downloadRate, true))
            } else {
                r.current_Flux(transUnit(0, false));
                r.connected_Time(transSecond2Time(0));
                r.up_Speed(transUnit(0, true));
                r.down_Speed(transUnit(0, true))
            }
            r.trafficAlertEnable(q.limitVolumeEnable);
            if (q.limitVolumeEnable) {
                if (q.limitVolumeType == "1") {
                    r.trafficUsed(transUnit(parseInt(q.data_counter.monthlySent, 10) + parseInt(q.data_counter.monthlyReceived, 10), false));
                    r.trafficLimited(transUnit(q.limitDataMonth, false))
                } else {
                    r.trafficUsed(transSecond2Time(q.data_counter.monthlyConnectedTime));
                    r.trafficLimited(transSecond2Time(q.limitTimeMonth))
                }
            }
            if (m != window.language) {
                m = window.language;
                a = 1
            }
            if (r.showTraffic()) {
                n.updateEcharts(q)
            } else {
                n.allFreeEcharts()
            }
            n.refreshStationInfo(r)
        },
        allFreeEcharts: function() {
            var q = n.data.free;
            q.value = 1;
            q.selected = false;
            q.name = h.i18n.prop("echarts_no");
            d.series[0].data = [q];
            d.title.text = "";
            n.setEcharts(d, h.i18n.prop("echarts_no"))
        },
        getNetworkType: function(q) {
            var r = q.toLowerCase();
            if (r == "" || r == "limited service") {
                r = "limited_service"
            }
            if (r == "no service") {
                r = "no_service"
            }
            if (r == "limited_service" || r == "no_service") {
                return h.i18n.prop("network_type_" + r)
            } else {
                return q
            }
        },
        data: {
            full: {
                value: 30,
                name: "��������",
                itemStyle: {
                    normal: {
                        color: "#DF4313"
                    }
                }
            },
            used: {
                value: 30,
                name: "��ʹ��",
                itemStyle: {
                    normal: {
                        color: "#8CC916"
                    }
                }
            },
            left1: {
                value: 50,
                name: "����ֵ��δʹ��",
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                }
            },
            free: {
                value: 50,
                name: "δʹ��",
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                }
            },
            alert: {
                value: 1,
                name: "����ֵ",
                itemStyle: {
                    normal: {
                        color: "#FF5500"
                    }
                }
            },
            alarm: {
                value: 19.7,
                name: "������",
                itemStyle: {
                    normal: {
                        color: "#8CC916"
                    }
                }
            },
            start: {
                value: 50,
                name: "����ֵ��δʹ��",
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                }
            }
        },
        getDataInfo: function(q) {
            return {
                data: /\d+(.\d+)?/.exec(q)[0],
                unit: /[A-Z]{1,2}/.exec(q)[0]
            }
        },
        oldAlarmData: null,
        oldUsedData: null,
        updateEcharts: function(K) {
            var u = h.i18n.prop("echarts_no");
            a++;
            if (a % 10 != 2) {
                return false
            }
            var N = 0,
                v = 0,
                C = 0,
                t = 0,
                q = 0,
                D = 0;
            if (K.limitVolumeEnable) {
                u = h.i18n.prop("echarts_used");
                d.series[0].data = [];
                if (K.limitVolumeType == "1") {
                    var L = transUnit(K.limitDataMonth, false);
                    d.series[0].data = [];
                    if (K.limitDataMonth == 0) {
                        var I = n.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        d.series[0].data.push(I)
                    } else {
                        var z = n.getDataInfo(L);
                        N = z.data * n.getUnitValue(z.unit) * 1048576;
                        v = parseInt(K.data_counter.monthlySent, 10) + parseInt(K.data_counter.monthlyReceived, 10);
                        C = N * K.limitVolumePercent / 100;
                        if (v >= N) {
                            var M = n.data.full;
                            M.value = 100;
                            M.name = h.i18n.prop("echarts_full");
                            d.series[0].data.push(M);
                            u = h.i18n.prop("echarts_full")
                        } else {
                            if (C - v > 0) {
                                D = C - v;
                                t = N - C
                            } else {
                                q = v - C;
                                t = N - v
                            }
                            var I = n.data.used;
                            if (C - v > 0) {
                                I.value = v
                            } else {
                                I.value = C
                            }
                            I.name = h.i18n.prop("echarts_used");
                            d.series[0].data.push(I);
                            if (D > 0) {
                                var B = n.data.left1;
                                B.value = D;
                                B.name = h.i18n.prop("echarts_left1");
                                d.series[0].data.push(B)
                            }
                            var y = n.data.alert;
                            y.value = N / 200;
                            y.name = h.i18n.prop("echarts_alert");
                            d.series[0].data.push(y);
                            if (q > 0) {
                                var w = n.data.alarm;
                                w.value = q;
                                w.name = h.i18n.prop("echarts_alarm");
                                d.series[0].data.push(w)
                            }
                            var A = n.data.free;
                            A.value = t;
                            A.name = h.i18n.prop("echarts_free");
                            d.series[0].data.push(A)
                        }
                    }
                } else {
                    d.series[0].data = [];
                    if (K.limitTimeMonth == 0) {
                        var I = n.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        d.series[0].data.push(I)
                    } else {
                        N = K.limitTimeMonth;
                        v = K.data_counter.monthlyConnectedTime;
                        C = N * K.limitVolumePercent / 100;
                        if (v >= N) {
                            var x = n.data.full;
                            x.value = 100;
                            x.name = h.i18n.prop("echarts_full");
                            d.series[0].data.push(x);
                            u = h.i18n.prop("echarts_full")
                        } else {
                            if (C - v > 0) {
                                D = C - v;
                                t = N - C
                            } else {
                                q = v - C;
                                t = N - v
                            }
                            var r = n.data.used;
                            if (C - v > 0) {
                                r.value = v
                            } else {
                                r.value = C
                            }
                            r.name = h.i18n.prop("echarts_used");
                            d.series[0].data.push(r);
                            if (D > 0) {
                                var J = n.data.left1;
                                J.value = D;
                                J.name = h.i18n.prop("echarts_left1");
                                d.series[0].data.push(J)
                            }
                            var G = n.data.alert;
                            G.value = N / 200;
                            G.name = h.i18n.prop("echarts_alert");
                            d.series[0].data.push(G);
                            if (q > 0) {
                                var E = n.data.alarm;
                                E.value = q;
                                E.name = h.i18n.prop("echarts_alarm");
                                d.series[0].data.push(E)
                            }
                            var H = n.data.free;
                            H.value = t;
                            H.name = h.i18n.prop("echarts_free");
                            d.series[0].data.push(H)
                        }
                    }
                }
            } else {
                var I = n.data.used;
                I.value = 1;
                I.selected = false;
                I.name = h.i18n.prop("echarts_no");
                d.series[0].data = [I];
                d.title.text = ""
            }
            var s = l.find(d.series[0].data, function(O) {
                return O.name == h.i18n.prop("echarts_used")
            });
            var F = l.find(d.series[0].data, function(O) {
                return O.name == h.i18n.prop("echarts_alarm")
            });
            if (!F) {
                F = {
                    value: 0
                }
            }
            if (typeof s == "undefined") {
                n.setEcharts(d, u)
            } else {
                if (n.oldUsedData != s.value || n.oldAlarmData != F.value) {
                    n.oldUsedData = s.value;
                    n.oldAlarmData = F.value;
                    n.setEcharts(d, u)
                }
            }
        },
        getUnitValue: function(q) {
            q = q.toUpperCase();
            if (q == "GB") {
                return "1024"
            } else {
                if (q == "TB") {
                    return "1048576"
                } else {
                    return "1"
                }
            }
        },
        setEcharts: function(t, s) {
            var r = n.data.start;
            r.value = 0;
            r.name = s;
            r.selected = false;
            var q = [r].concat(t.series[0].data);
            t.series[0].data = q;
            j.setOption(t, true);
            addTimeout(function() {
                j.resize()
            }, 1000)
        },
        refreshStationInfo: function(q) {
            q.wirelessDeviceNum(f.getStatusInfo().wirelessDeviceNum);
            if (a % 10 == 2) {
                f.getAttachedCableDevices({}, function(r) {
                    q.wireDeviceNum(r.attachedDevices.length)
                })
            }
        },
        getUnit: function(q) {
            if (q == "1024") {
                return "GB"
            } else {
                if (q == "1048576") {
                    return "TB"
                } else {
                    return "MB"
                }
            }
        },
        refreshOpmodeInfo: function(w) {
            var u = f.getOpMode();
            w.isLoggedIn(u.loginfo == "ok");
            var t = checkCableMode(u.blc_wan_mode);
            if (w.opCurMode() && !t) {
                var s = f.getLoginData();
                var r = s.modem_main_state;
                if (r == "modem_sim_undetected" || r == "modem_undetected" || r == "modem_sim_destroy" || r == "modem_waitpin" || r == "modem_waitpuk" || r == "modem_imsi_waitnck") {
                    window.location.reload();
                    return
                }
            }
            w.opCurMode(t);
            if (t && u.ethwan_mode == "DHCP") {
                w.enableFlag(false)
            } else {
                if ((!t && u.ppp_status != "ppp_disconnected") || (t && u.rj45_state != "idle" && u.rj45_state != "dead")) {
                    w.enableFlag(true)
                } else {
                    w.enableFlag(false)
                }
            }
            var v = (u.blc_wan_mode == "AUTO_PPP" || u.blc_wan_mode == "AUTO_PPPOE") ? "AUTO" : u.blc_wan_mode;
            var q = "";
            switch (v) {
                case "PPPOE":
                    q = "opmode_cable";
                    break;
                case "PPP":
                    q = "opmode_gateway";
                    break;
                default:
                    break
            }
            h("#opmode").attr("data-trans", q).text(h.i18n.prop(q));
            w.isShowHomeConnect(!t);
            w.showTraffic(k.TRAFFIC_SUPPORT && !t);
            w.isSupportQuicksetting(k.HAS_QUICK_SETTING && !t)
        }
    };

    function p() {
        var u = this;
        u.hasSms = k.HAS_SMS;
        u.hasPhonebook = k.HAS_PHONEBOOK;
        u.isSupportSD = k.SD_CARD_SUPPORT;
        u.isCPE = k.PRODUCT_TYPE == "CPE";
        u.hasRj45 = k.RJ45_SUPPORT;
        u.notDataCard = k.PRODUCT_TYPE != "DATACARD";
        u.hasParentalControl = k.HAS_PARENTAL_CONTROL;
        var s = f.getWifiBasic();
        if (k.WIFI_SUPPORT_QR_SWITCH) {
            u.showQRCode = k.WIFI_SUPPORT_QR_CODE && s.show_qrcode_flag
        } else {
            u.showQRCode = k.WIFI_SUPPORT_QR_CODE
        }
        if (k.WIFI_SUPPORT_QR_CODE) {
            u.qrcodeSrc = "./pic/qrcode_ssid_wifikey.png?_=" + h.now()
        } else {
            u.qrcodeSrc = "./pic/res_blacktrans.png"
        }
        if (u.hasRj45) {
            var r = checkCableMode(f.getOpMode().blc_wan_mode);
            u.opCurMode = e.observable(r);
            u.isShowHomeConnect = e.observable(!r);
            u.showTraffic = e.observable(k.TRAFFIC_SUPPORT && !r);
            u.isSupportQuicksetting = e.observable(k.HAS_QUICK_SETTING && !r)
        } else {
            u.isShowHomeConnect = e.observable(true);
            u.showTraffic = e.observable(k.TRAFFIC_SUPPORT);
            u.isSupportQuicksetting = e.observable(k.HAS_QUICK_SETTING)
        }
        if (k.PRODUCT_TYPE == "DATACARD") {
            h("#home_image").addClass("data-card")
        }
        var t = f.getConnectionInfo();
        u.networkType = e.observable(n.getNetworkType(t.networkType));
        u.connectStatus = e.observable(t.connectStatus);
        u.canConnect = e.observable(false);
        u.cStatus = e.computed(function() {
            if (u.connectStatus().indexOf("_connected") != -1) {
                return b.CONNECTED
            } else {
                if (u.connectStatus().indexOf("_disconnecting") != -1) {
                    return b.DISCONNECTING
                } else {
                    if (u.connectStatus().indexOf("_connecting") != -1) {
                        return b.CONNECTING
                    } else {
                        return b.DISCONNECTED
                    }
                }
            }
        });
        u.current_Flux = e.observable(transUnit(0, false));
        u.connected_Time = e.observable(transSecond2Time(0));
        u.up_Speed = e.observable(transUnit(0, true));
        u.down_Speed = e.observable(transUnit(0, true));
        u.isLoggedIn = e.observable(false);
        u.enableFlag = e.observable(true);
        u.iccid = e.observable("");
        u.imei = e.observable("");
        u.imsi = e.observable("");
        u.CurrentBand = e.observable("--");
        u.ssid = e.observable("");
        u.CellID = e.observable("");
        u.SINR = e.observable("");
        u.RSRP = e.observable("");
        u.RSRQ = e.observable("");
        u.hasWifi = k.HAS_WIFI;
        u.showMultiSsid = e.observable(k.HAS_MULTI_SSID && s.multi_ssid_enable == "1");
        u.trafficAlertEnable = e.observable(false);
        u.trafficUsed = e.observable("");
        u.trafficLimited = e.observable("");
        u.wireDeviceNum = e.observable(f.getAttachedCableDevices().attachedDevices.length);
        u.wirelessDeviceNum = e.observable(f.getStatusInfo().wirelessDeviceNum);
        u.showOpModeWindow = function() {
            if (u.enableFlag()) {
                return
            }
            showSettingWindow("change_mode", "opmode_popup", "opmode_popup", 400, 300, function() {})
        };
        u.currentOpMode = e.observable("0");
        var v = false;
        h("#showDetailInfo").popover({
            html: true,
            placement: "top",
            trigger: "focus",
            title: function() {
                return h.i18n.prop("device_info")
            },
            content: function() {
                return w()
            }
        }).on("shown.bs.popover", function() {
            v = true
        }).on("hidden.bs.popover", function() {
            v = false
        });

        function q() {
            var x = f.getDeviceInfo();
            u.imei(verifyDeviceInfo(x.imei));
            u.imsi(verifyDeviceInfo(x.imsi));
            u.ssid(verifyDeviceInfo(x.ssid));
            u.iccid(verifyDeviceInfo(x.iccid));
            u.CurrentBand(verifyDeviceInfo(x.arfcn));
            u.showMultiSsid(k.HAS_MULTI_SSID && x.multi_ssid_enable == "1");
            return x
        }
        q();

        function w() {
            var z = q();
            n.initShownStatus(z);
            var x = n.wanIpGet(z);
            var A = l.template(h("#detailInfoTmpl").html());
            var y = A({
                iccid: verifyDeviceInfo(z.iccid),
                imei: verifyDeviceInfo(z.imei),
                imsi: verifyDeviceInfo(z.imsi),
                signal: signalFormat(z.signal),
                hasWifi: k.HAS_WIFI,
                isCPE: k.PRODUCT_TYPE == "CPE",
                hasRj45: k.RJ45_SUPPORT,
                showMultiSsid: k.HAS_MULTI_SSID && z.multi_ssid_enable == "1",
                ssid: verifyDeviceInfo(z.ssid),
                max_access_num: verifyDeviceInfo(z.max_access_num),
                m_ssid: verifyDeviceInfo(z.m_ssid),
                m_max_access_num: verifyDeviceInfo(z.m_max_access_num),
                wifi_long_mode: "wifi_des_" + z.wifiRange,
                lanDomain: verifyDeviceInfo(z.lanDomain),
                ipAddress: verifyDeviceInfo(z.ipAddress),
                showMacAddress: k.SHOW_MAC_ADDRESS,
                macAddress: verifyDeviceInfo(z.macAddress),
                showIpv4WanIpAddr: n.initStatus.showIpv4WanIpAddr,
                wanIpAddress: x.wanIpAddress,
                showIpv6WanIpAddr: n.initStatus.showIpv6WanIpAddr,
                ipv6WanIpAddress: x.ipv6WanIpAddress,
                sw_version: verifyDeviceInfo(z.sw_version),
                hw_version: verifyDeviceInfo(z.hw_version),
                CellID: verifyDeviceInfo(z.cell_id),
                SINR: verifyDeviceInfo(z.nv_sinr),
                RSRQ: verifyRSRQ(z.network_type, z.nv_rsrq),
                RSRP: rssi_format(z.network_type, z.rssi),
                pci: z.pci,
                arfcn: z.lte_band,
                rssi: rssi_format(z.rssi)
            });
            return h(y).translate()
        }
        u.connectHandler = function() {
            if (u.connectStatus() == "ppp_connected") {
                showLoading("disconnecting");
                f.disconnect({}, function(x) {
                    if (x.result) {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                })
            } else {
                if (f.getStatusInfo().roamingStatus) {
                    showConfirm("dial_roaming_connect", function() {
                        u.connect()
                    })
                } else {
                    u.connect()
                }
            }
        };
        u.connect = function() {
            var y = f.getStatusInfo();
            var z = g.getTrafficResult(y);
            if (y.limitVolumeEnable && z.showConfirm) {
                var x = null;
                if (z.usedPercent > 100) {
                    x = {
                        msg: "traffic_beyond_connect_msg"
                    };
                    g.setTrafficAlertPopuped(true)
                } else {
                    x = {
                        msg: "traffic_limit_connect_msg",
                        params: [z.limitPercent]
                    };
                    g.setTrafficAlert100Popuped(false)
                }
                showConfirm(x, function() {
                    n.doConnect()
                })
            } else {
                n.doConnect()
            }
        };
        f.getSignalStrength({}, function(y) {
            var x = signalFormat(convertSignal(y));
            h("#fresh_signal_strength").text(x);
            if (v) {
                h("#popoverSignalTxt").text(x)
            }
        });
        n.refreshHomeData(u);
        addInterval(function() {
            f.getSignalStrength({}, function(A) {
                var y = signalFormat(convertSignal(A));
                h("#fresh_signal_strength").text(y);
                if (v) {
                    h("#popoverSignalTxt").text(y);
                    var B = verifyRSRQ(A.network_type, A.nv_rsrq);
                    var x = rssi_format(A.rssi);
                    var z = verifyDeviceInfo(A.nv_sinr);
                    h("#popoverSINR").text(z);
                    h("#popoverRSRP").text(x);
                    h("#popoverRSRQ").text(B);
                    h("#popoverArfcn").text(A.lte_band);
                    h("#popoverCellID").text(verifyDeviceInfo(A.cell_id))
                }
            });
            n.refreshHomeData(u)
        }, 1000);
        if (u.hasRj45) {
            n.refreshOpmodeInfo(u);
            addInterval(function() {
                n.refreshOpmodeInfo(u)
            }, 1000)
        }
        u.showNetworkSettingsWindow = function() {
            if (u.hasRj45) {
                f.getOpMode({}, function(x) {
                    var y = checkCableMode(x.blc_wan_mode);
                    if (y) {
                        window.location.hash = "#network_set"
                    } else {
                        window.location.hash = "#conn_set"
                    }
                })
            } else {
                window.location.hash = "#conn_set"
            }
        }
    }
    return {
        init: o
    }
});
define("language", "knockout service jquery set underscore".split(" "), function(j, f, d, c, g) {
    function a() {
        return f.getLanguage()
    }

    function b(k) {
        window.CURRENT_LANGUAGE = k;
        d("body").attr("lang", k);
        d.i18n.properties({
            name: "Messages",
            path: "i18n/",
            mode: "map",
            cache: true,
            language: k,
            callback: function() {
                jQuery.validator.messages = d.i18n.map;
                d("body").translate()
            }
        })
    }
    window.language = null;

    function e() {
        var m = this;
        var l = a();
        var k = g.map(c.LANGUAGES, function(n) {
            return new Option(n.name, n.value)
        });
        document.title = c.WEBUI_TITLE;
        if (d("#webui_title")[0]) {
            d("#webui_title").html(c.WEBUI_TITLE)
        }
        m.languages = j.observableArray(k);
        m.currentLan = j.observable(l.Language);
        window.language = m.currentLan();
        m.langChangeHandler = function(o, n) {
            clearValidateMsg();
            f.setLanguage({
                Language: m.currentLan()
            }, function() {
                b(m.currentLan());
                window.language = m.currentLan()
            })
        };
        b(m.currentLan())
    }

    function h() {
        j.applyBindings(new e(), d("#language")[0])
    }
    return {
        init: h
    }
});
define("entry", "jquery knockout set service underscore menu logout CryptoJS".split(" "), function(f, p, d, g, n, c, q, m) {
    var l = {
        LOGIN: 0,
        WAIT_PIN: 1,
        WAIT_PUK: 2,
        PUK_LOCKED: 3,
        LOGGEDIN: 4,
        LOADING: 5
    };
    var b = h();
    var e = 0;
    var k = "0";

    function j() {
        var y = this;
        var v = g.getLoginData();
        var t = g.getLoginStatus();
        y.confirmPIN = p.observable();
        y.leftSeconds = p.observable(0);
        y.loginCount = p.observable(0);
        y.loginSecuritySupport = p.observable(d.LOGIN_SECURITY_SUPPORT);
        y.newPIN = p.observable();
        y.password = p.observable();
        y.PIN = p.observable();
        y.pinNumber = p.observable(v.pinnumber);
        y.PUK = p.observable();
        y.pukNumber = p.observable(v.puknumber);
        y.showEntrance = p.observable(false);
        y.sharePathInvalid = p.observable(false);
        y.uiLoginTimer = p.observable(300);
        y.accountLocked = p.computed(function() {
            return y.loginCount() == d.MAX_LOGIN_COUNT && y.leftSeconds() != "-1"
        });
        y.leftUnlockTime = p.computed(function() {
            y.leftSeconds();
            var A = transSecond2Time(y.uiLoginTimer());
            return A.substring(A.indexOf(":") + 1, A.length)
        });
        if (d.SD_CARD_SUPPORT) {
            g.getSDConfiguration({}, function(A) {
                y.showEntrance(A.sd_status == "1" && A.share_status == "1" && A.sd_mode == "0");
                if (y.showEntrance()) {
                    g.checkFileExists({
                        path: A.share_file
                    }, function(B) {
                        if (B.status == "exist" || B.status == "processing") {
                            y.sharePathInvalid(false)
                        } else {
                            y.sharePathInvalid(true)
                        }
                    })
                }
            })
        }
        var r = s(t, v);
        y.pageState = p.observable(r);
        if (r == l.LOADING) {
            addTimeout(u, 500)
        }
        x();
        y.login = function() {
            if (d.LOGIN_SECURITY_SUPPORT && y.accountLocked()) {
                showAlert("password_error_account_lock_time", function() {
                    x()
                });
                return false
            }
            y.pageState(l.LOADING);
            window.clearInterval(b);
            var C = "";
            if (d.PASSWORD_ENCODE) {
                C = y.password()
            } else {
                var B = g.getDeviceInfoLow();
                var D = m.enc.Latin1.parse(B.skey);
                var A = m.enc.Latin1.parse(B.siv);
                C = m.AES.encrypt(y.password(), D, {
                    iv: A,
                    mode: m.mode.CBC,
                    padding: m.pad.ZeroPadding
                }).toString()
            }
            g.login({
                password: C
            }, function(E) {
                setTimeout(function() {
                    b = h()
                }, 1300);
                if (E.result) {
                    y.pageState(l.LOGGEDIN);
                    if (d.LOGIN_SECURITY_SUPPORT) {
                        y.loginCount(0);
                        y.uiLoginTimer(300);
                        clearInterval(e)
                    }
                    f("#container").empty();
                    window.location.hash = "#main";
                    q.init()
                } else {
                    y.password("");
                    if (d.LOGIN_SECURITY_SUPPORT) {
                        y.checkLoginData(function() {
                            if (y.loginCount() == d.MAX_LOGIN_COUNT) {
                                showAlert("password_error_five_times", function() {
                                    x()
                                });
                                y.startLoginLockInterval()
                            } else {
                                showAlert({
                                    msg: "password_error_left",
                                    params: [d.MAX_LOGIN_COUNT - y.loginCount()]
                                }, function() {
                                    x()
                                })
                            }
                        })
                    } else {
                        showAlert("password_error", function() {
                            x()
                        })
                    }
                    y.pageState(l.LOGIN)
                }
            })
        };
        y.checkLoginData = function(A) {
            g.getLoginData({}, function(C) {
                var B = parseInt(C.psw_fail_num_str, 10);
                y.loginCount(d.MAX_LOGIN_COUNT - B);
                y.leftSeconds(C.login_lock_time);
                y.uiLoginTimer(C.login_lock_time);
                if (f.isFunction(A)) {
                    A()
                } else {
                    if (y.loginCount() == d.MAX_LOGIN_COUNT) {
                        y.startLoginLockInterval()
                    }
                }
            })
        };
        y.startLoginLockInterval = function() {
            e = setInterval(function() {
                g.getLoginData({}, function(A) {
                    if (A.login_lock_time <= 0 || A.psw_fail_num_str == 5) {
                        y.loginCount(0);
                        clearInterval(e)
                    }
                    if (y.leftSeconds() != A.login_lock_time) {
                        y.leftSeconds(A.login_lock_time);
                        y.uiLoginTimer(A.login_lock_time)
                    } else {
                        y.uiLoginTimer(y.uiLoginTimer() > 0 ? y.uiLoginTimer() - 1 : 0)
                    }
                })
            }, 1000)
        };
        y.checkLoginData();
        y.enterPIN = function() {
            y.pageState(l.LOADING);
            var A = y.PIN();
            g.enterPIN({
                PinNumber: A
            }, function(B) {
                if (!B.result) {
                    showAlert("pin_error", function() {
                        u()
                    });
                    y.PIN("")
                } else {
                    u()
                }
            })
        };

        function x() {
            setTimeout(function() {
                var A = f("#txtAdmin:visible");
                var B = f("#txtPIN:visible");
                var C = f("#txtPUK:visible");
                if (A.length > 0) {
                    A.focus()
                } else {
                    if (B.length > 0) {
                        B.focus()
                    } else {
                        if (C.length > 0) {
                            C.focus()
                        }
                    }
                }
            }, 100)
        }

        function u() {
            var C = g.getLoginData();
            var A = g.getLoginStatus();
            var B = s(A, C);
            if (B == l.LOADING) {
                addTimeout(u, 500)
            } else {
                y.pageState(B);
                y.pinNumber(C.pinnumber);
                y.pukNumber(C.puknumber)
            }
            x()
        }
        y.enterPUK = function() {
            y.pageState(l.LOADING);
            var C = y.newPIN();
            var A = y.confirmPIN();
            var B = {};
            B.PinNumber = C;
            B.PUKNumber = y.PUK();
            g.enterPUK(B, function(D) {
                if (!D.result) {
                    showAlert("puk_error", function() {
                        u()
                    });
                    y.PUK("");
                    y.newPIN("");
                    y.confirmPIN("")
                } else {
                    u()
                }
            })
        };

        function z(A, C) {
            if (A.status == "loggedIn") {
                var B = C.modem_main_state;
                if (B == "modem_waitpin") {
                    return l.WAIT_PIN
                } else {
                    if ((B == "modem_waitpuk" || C.pinnumber == 0) && (C.puknumber != 0)) {
                        return l.WAIT_PUK
                    } else {
                        if ((C.puknumber == 0 || B == "modem_sim_destroy") && B != "modem_sim_undetected" && B != "modem_undetected") {
                            return l.PUK_LOCKED
                        } else {
                            return l.LOGGEDIN
                        }
                    }
                }
            } else {
                var B = C.modem_main_state;
                if (f.inArray(B, d.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                    return l.LOADING
                } else {
                    return l.LOGIN
                }
            }
        }

        function s(A, B) {
            if (d.LOGIN_THEN_CHECK_PIN) {
                return z(A, B)
            } else {
                return w(A, B)
            }
        }

        function w(A, C) {
            if (A.status == "loggedIn") {
                return l.LOGGEDIN
            } else {
                var B = C.modem_main_state;
                if (f.inArray(B, d.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                    return l.LOADING
                } else {
                    if (B == "modem_waitpin") {
                        return l.WAIT_PIN
                    } else {
                        if ((B == "modem_waitpuk" || parseInt(C.pinnumber) === 0) && (parseInt(C.puknumber) != 0)) {
                            return l.WAIT_PUK
                        } else {
                            if ((parseInt(C.puknumber) === 0 || B == "modem_sim_destroy") && B != "modem_sim_undetected" && B != "modem_undetected") {
                                return l.PUK_LOCKED
                            } else {
                                return l.LOGIN
                            }
                        }
                    }
                }
            }
        }
    }

    function a() {
        if (window.location.hash != d.defaultRoute && n.indexOf(d.GUEST_HASH, window.location.hash) == -1) {
            if (!manualLogout && k == "1") {
                manualLogout = false;
                k = "UNREAL";
                showAlert("need_login_again", function() {
                    window.location = "index.html"
                })
            } else {
                if (k == "UNREAL") {
                    return
                } else {
                    window.location = "index.html"
                }
            }
        }
    }

    function h() {
        return setInterval(function() {
            var r = g.getStatusInfo();
            if (!r.isLoggedIn) {
                a();
                return
            }
            k = g.getStatusInfo().isLoggedIn ? "1" : "0"
        }, 1000)
    }

    function o() {
        var t = g.getStatusInfo();
        if (t.isLoggedIn) {
            window.location.hash = "#main";
            return
        }
        var r = f("#container")[0];
        p.cleanNode(r);
        var s = new j();
        p.applyBindings(s, r);
        f("#frmLogin").validate({
            submitHandler: function() {
                s.login()
            },
            rules: {
                txtAdmin: "login_password_length_check"
            }
        });
        f("#frmPIN").validate({
            submitHandler: function() {
                s.enterPIN()
            },
            rules: {
                txtPIN: "pin_check"
            }
        });
        f("#frmPUK").validate({
            submitHandler: function() {
                s.enterPUK()
            },
            rules: {
                txtNewPIN: "pin_check",
                txtConfirmPIN: {
                    equalToPin: "#txtNewPIN"
                },
                txtPUK: "puk_check"
            }
        })
    }
    return {
        init: o,
        gotoLogin: a
    }
});
define("logout", "set service knockout underscore jquery".split(" "), function(b, f, j, g, d) {
    function c() {
        var l = this;
        var k = function() {
            var m = f.getLoginStatus();
            return (m.status == "loggedIn")
        }();
        l.loggedIn = j.observable(k);
        l.logout = function() {
            showConfirm("confirm_logout", function() {
                manualLogout = true;
                f.logout({}, a())
            })
        };
        l.showLogout = function() {
            if (b.HAS_LOGIN) {
                return l.loggedIn()
            } else {
                return false
            }
        }
    }

    function a() {
        window.location = "index.html"
    }

    function e() {
        var k = new c();
        h(k)
    }

    function h(l) {
        var k = d("#logout")[0];
        j.cleanNode(k);
        j.applyBindings(l, k)
    }
    return {
        init: e
    }
});
define("opmode", "knockout service jquery set underscore".split(" "), function(d, a, f, c, b) {
    function e() {
        var h = this;
        h.isLoggedIn = d.observable(false);
        h.enableFlag = d.observable(false);
        h.showOpModeWindow = function() {
            showSettingWindow("change_mode", "opmode_popup", "opmode_popup", 400, 300, function() {})
        };
        h.currentOpMode = d.observable("0");
        a.getOpMode({}, function(l) {
            h.isLoggedIn(l.loginfo == "ok");
            if (l.opms_wan_mode != "PPP" && l.rj45_state != "idle" && l.rj45_state != "dead") {
                h.enableFlag(false)
            } else {
                if (l.opms_wan_mode == "PPP" && l.ppp_status != "ppp_disconnected") {
                    h.enableFlag(false)
                } else {
                    if (l.opms_wan_mode == "DHCP") {
                        h.enableFlag(true)
                    } else {
                        h.enableFlag(true)
                    }
                }
            }
            var k = (l.opms_wan_mode == "DHCP" || l.opms_wan_mode == "STATIC") ? "PPPOE" : l.opms_wan_mode;
            var j = "";
            switch (k) {
                case "BRIDGE":
                    j = "opmode_bridge";
                    break;
                case "PPP":
                    j = "opmode_gateway";
                    break;
                case "PPPOE":
                    j = "opmode_cable";
                    break;
                default:
                    break
            }
            f("#opmode").attr("data-trans", j).text(f.i18n.prop(j))
        });
        setInterval(function() {
            var j = a.getConnectionInfo();
            if (j.opms_wan_mode == "DHCP") {
                h.enableFlag(true)
            } else {
                if ((j.opms_wan_mode == "PPP" && j.ppp_status != "ppp_disconnected") || (j.opms_wan_mode != "PPP" && j.rj45_state != "idle" && j.rj45_state != "dead")) {
                    h.enableFlag(false)
                } else {
                    h.enableFlag(true)
                }
            }
        }, 1000)
    }

    function g() {
        var h = f("#currentOpMode")[0];
        d.cleanNode(h);
        var j = new e();
        d.applyBindings(j, h)
    }
    return {
        init: g
    }
});
define("opmode_popup", "knockout service jquery set underscore".split(" "), function(d, a, f, c, b) {
    function e() {
        var j = this;
        var h = "";
        j.selectedMode = d.observable("0");
        a.getOpMode({}, function(k) {
            if (k.blc_wan_mode == "AUTO_PPP") {
                h = "AUTO"
            } else {
                if (k.blc_wan_mode == "AUTO_PPPOE") {
                    h = "AUTO"
                } else {
                    if (k.blc_wan_mode == "PPPOE") {
                        h = "PPPOE"
                    } else {
                        h = k.blc_wan_mode
                    }
                }
            }
            j.selectedMode(h)
        });
        j.changeOpMode = function() {
            var k = f('input:radio[name="opMode"]:checked').val();
            var l = "";
            if (k == h) {
                hidePopupSettingWindow();
                return
            }
            if (k == "LTE_BRIDGE") {
                l = "opmode_msg3"
            } else {
                l = "opmode_msg2"
            }
            showConfirm(l, function() {
                showLoading();
                a.SetOperationMode({
                    opMode: k
                }, function(n) {
                    if (n && n.result == "success") {
                        var m = "";
                        switch (k) {
                            case "PPP":
                                m = "opmode_gateway";
                                break;
                            case "PPPOE":
                                m = "opmode_cable";
                                break;
                            default:
                                break
                        }
                        f("#opmode").attr("data-trans", m).text(f.i18n.prop(m));
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                })
            })
        }
    }

    function g() {
        var h = new e();
        d.applyBindings(h, f("#popupSettingWindow")[0]);
        f("#opmode_form").validate({
            submitHandler: function() {
                h.changeOpMode()
            }
        })
    }
    return {
        init: g
    }
});
define("router", "underscore jquery menu set service".split(" "), function(j, f, b, c, g) {
    var e = "";
    var a = f("#container");
    checkFormContentModify = function(o) {
        if (c.CONTENT_MODIFIED.modified && window.location.hash != o) {
            if (c.CONTENT_MODIFIED.message == "sms_to_save_draft") {
                c.CONTENT_MODIFIED.callback.ok(c.CONTENT_MODIFIED.data);
                c.resetContentModifyValue();
                window.location.hash = o
            } else {
                showConfirm(c.CONTENT_MODIFIED.message, {
                    ok: function() {
                        c.CONTENT_MODIFIED.callback.ok(c.CONTENT_MODIFIED.data);
                        c.resetContentModifyValue();
                        window.location.hash = o
                    },
                    no: function() {
                        var p = c.CONTENT_MODIFIED.callback.no(c.CONTENT_MODIFIED.data);
                        if (!p) {
                            window.location.hash = o;
                            c.resetContentModifyValue()
                        }
                    }
                })
            }
            return false
        } else {
            return true
        }
    };

    function n() {
        setInterval(function() {
            var t = g.getStatusInfo();
            var o = b.findMenu();
            if (o.length == 0) {
                return false
            }
            var s = ["phonebook", "sms_list"];
            var p = (f.inArray(o[0].path, s) != -1);
            if (o[0].checkSIMStatus === true) {
                var r = t.simStatus == "modem_sim_undetected" || t.simStatus == "modem_sim_destroy" || t.simStatus == "modem_waitpin" || t.simStatus == "modem_waitpuk";
                var q = t.simStatus == "modem_imsi_waitnck";
                if (t.isLoggedIn && ((f("#div-nosimcard")[0] == undefined && r) || (f("#div-network-lock")[0] == undefined && q) || ((f("#div-nosimcard")[0] != undefined || f("#div-network-lock")[0] != undefined) && t.simStatus == "modem_init_complete"))) {
                    d(o[0], t.simStatus, p)
                }
            }
        }, 1000)
    }

    function m() {
        var p = window.location.hash;
        if (p == "#entry" || j.indexOf(c.GUEST_HASH, p) != -1) {
            f("#manageContainer").attr("style", "margin-top:-36px;")
        } else {
            f("#manageContainer").attr("style", "margin-top:0px;")
        }
        if (window.location.hash == "#entry") {
            f("#mainContainer").addClass("loginBackgroundBlue")
        } else {
            var o = f("#mainContainer");
            if (o.hasClass("loginBackgroundBlue")) {
                f("#container").css({
                    margin: 0
                });
                o.removeClass("loginBackgroundBlue").height("auto")
            }
        }
    }

    function d(q, o, p) {
        var r = {};
        f.extend(r, q);
        if (o == "modem_sim_undetected" || o == "modem_sim_destroy") {
            if (!p) {
                r.path = "sim_abnormal"
            }
        } else {
            if (o == "modem_waitpin" || o == "modem_waitpuk") {
                r.path = "sim_abnormal"
            } else {
                if (o == "modem_imsi_waitnck") {
                    r.path = "locknet"
                }
            }
        }
        l(r)
    }

    function l(q) {
        var p = q.path.replace(/\//g, "_");
        var r = f("body").removeClass();
        if (p != "entry" && p != "main") {
            r.addClass("beautiful_bg page_" + p)
        } else {
            r.addClass("page_" + p)
        }
        clearTimer();
        hideLoading();
        var o = "text!tmpl/" + q.path + ".html";
        require([o, q.path], function(s, t) {
            a.stop(true, true);
            a.hide();
            a.html(s);
            t.init();
            b.refreshMenu();
            f("#container").translate();
            b.activeSubMenu();
            f("form").attr("autocomplete", "off");
            a.fadeIn()
        })
    }

    function h() {
        if (window.location.hash != e) {
            var t = g.getStatusInfo();
            if (window.location.hash == c.defaultRoute || j.indexOf(c.GUEST_HASH, window.location.hash) != -1) {
                if (t.isLoggedIn) {
                    window.location.hash = e == "" ? "#main" : e;
                    return
                }
            }
            var q = b.findMenu();
            if (q.length == 0) {
                window.location.hash = c.defaultRoute
            } else {
                if (c.RJ45_SUPPORT && window.location.hash == "#main") {
                    if ((q[0].checkSIMStatus && checkCableMode(t.blc_wan_mode)) || (!q[0].checkSIMStatus && !checkCableMode(t.blc_wan_mode))) {
                        window.location.reload();
                        return
                    }
                }
                var o = b.findMenu(e);
                e = q[0].hash;
                if (e == "#entry") {
                    f("#indexContainer").addClass("login-page-bg");
                    b.rebuild()
                } else {
                    f("#indexContainer").removeClass("login-page-bg")
                }
                if (o.length != 0 && q[0].path == o[0].path && q[0].level != o[0].level && q[0].level != "1" && o[0].level != "1") {
                    return
                }
                m();
                var s = ["phonebook", "sms_list"];
                var r = (f.inArray(q[0].path, s) != -1);
                if (q[0].checkSIMStatus === true || r) {
                    if (t.simStatus == undefined) {
                        showLoading("waiting");

                        function p() {
                            var u = g.getStatusInfo();
                            if (u.simStatus == undefined || f.inArray(u.simStatus, c.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                                addTimeout(p, 500)
                            } else {
                                d(q[0], u.simStatus, r);
                                hideLoading()
                            }
                        }
                        p()
                    } else {
                        d(q[0], t.simStatus, r)
                    }
                } else {
                    l(q[0])
                }
            }
        }
    }

    function k() {
        n();
        window.location.hash = window.location.hash || "#main";
        if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
            window.onhashchange = h;
            h()
        } else {
            setInterval(h, 200)
        }
        f("a[href^='#']").die("click").live("click", function() {
            var o = f(this);
            c.CONTENT_MODIFIED.checkChangMethod();
            return checkFormContentModify(o.attr("href"))
        })
    }
    return {
        init: k
    }
});
define("statusBar", "knockout jquery underscore service set menu tooltip".split(" "), function(V, G, ac, g, L, W, I) {
    var h = false;
    var s = false;
    var z = false;
    var q = null;
    var T = 0;
    var c = [];
    var X = false;
    var w = true;
    var S = true;
    var Y = {};
    var H = null;
    var x = false;
    var K = null;
    var O = null;
    var l = false;
    var u = false;
    var U = 0;
    var J = function() {
        return g.getStatusInfo()
    };

    function M() {
        var ai = this;
        var ah = J();
        var ae = ah.roamingStatus ? true : false;
        var ag = G("#langLogoBar");

        function ad() {
            showLoading("connecting");
            g.connect({}, function(aj) {
                if (aj.result) {
                    refreshWifiConnectStatus(ai, aj.status)
                }
                successOverlay()
            }, function(aj) {
                errorOverlay()
            })
        }

        function af() {
            showLoading("disconnecting");
            g.disconnect({}, function(aj) {
                if (aj.result) {
                    refreshWifiConnectStatus(ai, aj.status)
                }
                successOverlay()
            }, function(aj) {
                errorOverlay()
            })
        }
        if (ah.isLoggedIn) {
            if (!ag.hasClass("langborderBg")) {
                ag.addClass("langborderBg")
            }
            G("#statusBar:hidden").show()
        } else {
            if (ag.hasClass("langborderBg")) {
                ag.removeClass("langborderBg")
            }
            G("#statusBar:visible").hide()
        }
        ai.batteryLevel = V.observable(ah.batteryLevel + "%");
        ai.batteryPers = V.observable(n(ah.batteryPers, ah.batteryStatus));
        ai.batteryStatus = V.observable(ah.batteryStatus);
        ai.connectionCssClass = V.observable("");
        ai.connectStatus = V.observable(ah.connectStatus);
        ai.connectStatusText = V.observable();
        ai.connectStatusTrans = V.observable();
        ai.hasWifi = V.observable(L.HAS_WIFI);
        ai.hasBattery = V.observable(L.HAS_BATTERY);
        ai.isLoggedIn = V.observable(ah.isLoggedIn);
        ai.isShowConnectionIcon = V.observable(false);
        ai.isShowFotaNewversionIcon = V.observable(ah.new_version_state && ah.fota_package_already_download != "yes" && !L.isShowFotaIcon);
        ai.isShowRj45ConnectionIcon = V.observable(false);
        ai.networkOperator = V.observable(o(ah.spn_b1_flag, ah.spn_name_data, ah.spn_b2_flag, ah.networkOperator, ae));
        ai.networkType = V.observable(getNetworkType(ah.networkType));
        ai.pinStatus = V.observable(ah.pinStatus);
        ai.pinStatusText = V.observable();
        ai.rj45ConnectionCssClass = V.observable("");
        ai.roamingStatus = V.observable(ah.roamingStatus ? "R" : "");
        ai.showAttachedDevices = V.observable(ah.wifiStatus);
        ai.showSmsDeleteConfirm = V.observable(false);
        ai.smsUnreadCount = V.observable(0);
        ai.simStatus = V.observable(D(ah.simStatus));
        ai.signalCssClass = V.observable(F(ah.signalImg, ah.networkType, ah.simStatus));
        ai.updateType = V.observable(g.getUpdateType().update_type);
        ai.wifiStatusCssClass = V.observable(m(ah.wifiStatus, ah.wirelessDeviceNum));
        ai.wifiStatusImg = V.observable(e(ah.wifiStatus, ah.wirelessDeviceNum));
        k(ai, ah.connectStatus, ah.data_counter, ah.connectWifiSSID, ah.connectWifiStatus, ah.rj45ConnectStatus);
        ai.connect = ad;
        ai.disconnect = af
    }

    function aa() {
        var ad = "#msg_main";
        if (window.location.hash == "#msg_main") {
            ad = "#msg_list"
        }
        L.CONTENT_MODIFIED.checkChangMethod();
        if (checkFormContentModify(ad)) {
            window.location.hash = ad
        }
    }
    gotoSmsList = aa;

    function o(ah, ad, ag, af, ae) {
        if (ad == "") {
            return af
        } else {
            ad = decodeMessage(ad);
            if (ah == "0" && ag == "0") {
                if (ae) {
                    return ad == af ? af : (ad + "  " + af)
                } else {
                    return ad
                }
            } else {
                if (ah == "1" && ag == "1") {
                    if (ae) {
                        return af
                    } else {
                        return ad == af ? af : (ad + "  " + af)
                    }
                } else {
                    if (ah == "1") {
                        return ad == af ? af : (ad + "  " + af)
                    } else {
                        if (ag == "1") {
                            if (ae) {
                                return af
                            } else {
                                return ad
                            }
                        }
                    }
                }
            }
            return ""
        }
    }

    function y(au, ak, an) {
        L.smsMaxId = au.id;
        var af = G.now();
        Y["m" + af] = af;
        var av = au.number;
        if (w && L.phonebook && L.phonebook.length == 0) {
            w = false;
            if (L.HAS_PHONEBOOK) {
                Z()
            } else {
                L.phonebook = []
            }
        }
        for (ap in L.phonebook) {
            if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                av = L.phonebook[ap].pbm_name;
                break
            }
        }
        var ai = {
            mark: "m" + af,
            name: av,
            title: G.i18n.prop("sms"),
            titleTrans: "sms",
            tag: au.tag,
            content: au.content,
            datetime: au.time
        };
        if (H == null) {
            H = G.template("newMessagePopTmpl", G("#newMessagePopTmpl"))
        }
        G(".bubbleItem:not(.report)", "#buttom-bubble").remove();
        G.tmpl("newMessagePopTmpl", ai).appendTo("#buttom-bubble");
        if ((window.location.hash == "#msg_main" || window.location.hash == "#msg_list") && an == "1") {
            var ag = L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH);
            var ao = getLastNumber(au.number, L.SMS_MATCH_LENGTH);
            var at = G("#smslist-item-" + ao);
            if (at && at.length > 0) {
                for (var ap = 0; L.listMsgs && ap < L.listMsgs.length; ap++) {
                    if (getLastNumber(L.listMsgs[ap].number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        L.listMsgs[ap].id = au.id;
                        L.listMsgs[ap].latestId = au.id;
                        L.listMsgs[ap].latestSms = au.content;
                        L.listMsgs[ap].latestTime = au.time;
                        if (!ak) {
                            L.listMsgs[ap].newCount++;
                            L.listMsgs[ap].totalCount++
                        }
                        break
                    }
                }
                at.find(".smslist-item-checkbox p.checkbox").attr("id", au.id);
                at.find(".smslist-item-checkbox input:checkbox").val(au.id).attr("id", "checkbox" + au.id);
                if (!ak) {
                    var ah = at.find(".smslist-item-total-count").text();
                    ah = Number(ah.substring(1, ah.length - 1));
                    at.find(".smslist-item-total-count").text("(" + (ah + 1) + ")");
                    if (!L.currentChatObject || L.currentChatObject != getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        var aj = at.find(".smslist-item-new-count").removeClass("hide");
                        if (aj && aj.text().length > 0) {
                            aj.text(Number(aj.text()) + 1)
                        } else {
                            aj.text(1)
                        }
                    }
                }
                if (at.find(".smslist-item-draft-flag").length > 0) {
                    if (L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        at.find(" td:nth-child(2)").removeClass("font-weight-bold")
                    } else {
                        at.find(" td:nth-child(2)").addClass("font-weight-bold")
                    }
                } else {
                    var ae = at.find(".smslist-item-msg").text(au.content);
                    ae.closest("td").prop("title", au.content);
                    at.find("span.clock-time").text(au.time);
                    if (L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        ae.closest("tr").removeClass("font-weight-bold")
                    } else {
                        ae.closest("tr").addClass("font-weight-bold")
                    }
                }
                at.find(".smslist-item-repeat span").die().click(function() {
                    forwardClickHandler(au.id)
                });
                var ar = at;
                at.hide().remove();
                G("#smslist-table").prepend(ar.show())
            } else {
                var al = "";
                if (L.phonebook && L.phonebook.length > 0) {
                    for (ap in L.phonebook) {
                        if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                            al = L.phonebook[ap].pbm_name;
                            break
                        }
                    }
                }
                var aq = {
                    id: au.id,
                    name: al,
                    number: au.number,
                    latestId: au.id,
                    totalCount: 1,
                    newCount: ag ? 0 : 1,
                    latestSms: au.content,
                    latestTime: au.time,
                    checked: false,
                    hasDraft: false,
                    itemId: getLastNumber(au.number, L.SMS_MATCH_LENGTH)
                };
                if (O == null) {
                    O = G.template("smsTableTmpl", G("#smsTableTmpl"))
                }
                G.tmpl("smsTableTmpl", {
                    data: [aq]
                }).prependTo("#smslist-table")
            }
            if (L.HAS_PHONEBOOK) {
                G(".sms-add-contact-icon").removeClass("hide")
            } else {
                G(".sms-add-contact-icon").addClass("hide")
            }
            if (ag) {
                var ad = G("#talk-item-" + au.id, "#chatlist");
                if (ad && ad.length > 0) {
                    G(".J_content pre", ad).html(dealContent(au.content));
                    G(".time .smslist-item-time", ad).text(au.time);
                    G(".smslist-item-repeat", ad).die().click(function() {
                        forwardClickHandler(au.id)
                    });
                    G(".smslist-item-delete", ad).die().click(function() {
                        deleteSingleItemClickHandler(au.id)
                    })
                } else {
                    G("#smsOtherTmpl").tmpl(au).appendTo("#chatlist");
                    G(".clear-container", "#chatpanel").animate({
                        scrollTop: G("#chatlist").height()
                    })
                }
                if (!L.SMS_SET_READ_WHEN_COMPLETE) {
                    g.setSmsRead({
                        ids: [au.id]
                    }, G.noop)
                } else {
                    if (L.SMS_SET_READ_WHEN_COMPLETE && au.receivedAll) {
                        g.setSmsRead({
                            ids: [au.id]
                        }, G.noop)
                    }
                }
            }
            enableCheckbox(G("#smslist-checkAll"))
        }
        if (window.location.hash == "#msg_sim" && an == "0") {
            var al = "";
            if (L.phonebook && L.phonebook.length > 0) {
                for (ap in L.phonebook) {
                    if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        al = L.phonebook[ap].pbm_name;
                        break
                    }
                }
            }
            var aq = {
                id: au.id,
                name: al,
                number: au.number,
                content: au.content,
                time: au.time,
                tag: au.tag,
                checked: false,
                itemId: getLastNumber(au.number, L.SMS_MATCH_LENGTH)
            };
            if (ak) {
                var am = G(".simMsgList-item-class-" + aq.id);
                am.hide().remove()
            }
            if (K == null) {
                K = G.template("ssimMessageListTemplate", G("#simMessageListTemplate"))
            }
            G.tmpl("simMessageListTemplate", {
                data: [aq]
            }).prependTo("#simMsgList_container")
        }
    }

    function a() {
        var ad = g.getCurrentUpgradeState();
        if (ad.current_upgrade_state == "low_battery") {
            showInfo("ota_low_battery");
            clearInterval(T)
        }
    }

    function D(ad) {
        var ae;
        switch (ad) {
            case "modem_destroy":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_imsi_waitnck":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_init_complete":
                ae = "./pic/simcard_detected.png";
                break;
            case "modem_sim_destroy":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_sim_undetected":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_undetected":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_waitpin":
                ae = "./pic/simcard_undetected.png";
                break;
            case "modem_waitpuk":
                ae = "./pic/simcard_undetected.png";
                break;
            default:
                ae = "./pic/simcard_detected.png";
                break
        }
        return ae
    }

    function B(ad, ae) {
        setTimeout(function() {
            var ag = G("#chosenUserSelect");
            var ah = G("option", ag);
            for (var af = 0; af < ah.length; af++) {
                if (getLastNumber(ae, L.SMS_MATCH_LENGTH) == ah[af].value) {
                    ah[af].text = ad + "/" + ae;
                    ah[af].value = ae;
                    break
                }
            }
            ag.trigger("liszt:updated")
        }, 0)
    }

    function t(ad) {
        if (G.isArray(ad.pbm_data) && ad.pbm_data.length > 0) {
            L.phonebook = ad.pbm_data
        }
    }

    function j(ad, ae) {
        if (!L.dbMsgs) {
            L.dbMsgs = []
        }
        if (c.length == 0) {
            G.each(L.dbMsgs, function(af, ag) {
                c.push(ag.id)
            })
        }
        G.each(ad, function(af, ah) {
            if (G.inArray(ah.id, c) == -1) {
                c.push(ah.id);
                L.dbMsgs.push(ah);
                if (ah.tag == "1") {
                    y(ah, false, ae)
                }
            } else {
                for (var ag = 0; ag < L.dbMsgs.length; ag++) {
                    if (L.dbMsgs[ag].id == ah.id && L.dbMsgs[ag].content != ah.content && ah.tag == "1") {
                        L.dbMsgs[ag].content = ah.content;
                        y(ah, true, ae);
                        break
                    }
                }
            }
        })
    }

    function n(af, ad) {
        var ae = null;
        if ("0" == ad) {
            if ("1" == af) {
                ae = "pic/power_one.png"
            } else {
                if ("2" == af) {
                    ae = "pic/power_two.png"
                } else {
                    if ("3" == af) {
                        ae = "pic/power_three.png"
                    } else {
                        if ("4" == af) {
                            ae = "pic/power_full.png"
                        } else {
                            ae = "pic/power_out.png"
                        }
                    }
                }
            }
        } else {
            ae = "pic/power_charging.gif"
        }
        return ae
    }

    function k(ae, ad, ak, af, aj, ai) {
        var ah = "icon_connection ";
        var ag = "icon_connection ";
        if (ai == "connect") {
            ah += "connecting"
        } else {
            if (ai == "working") {
                ah += "rj45_connected"
            } else {
                ah += "disconnect"
            }
        }
        if (ad == "ppp_connecting" || ad == "wifi_connecting") {
            ag += "connecting"
        } else {
            if (ad == "ppp_connected") {
                if (ak.uploadRate != "0" && ak.downloadRate != "0") {
                    ag += "connectionBoth"
                } else {
                    if (ak.uploadRate != "0" && ak.downloadRate == "0") {
                        ag += "connectionUp"
                    } else {
                        if (ak.uploadRate == "0" && ak.downloadRate != "0") {
                            ag += "connectionDown"
                        } else {
                            ag += "connectionNone"
                        }
                    }
                }
            } else {
                if (ad == "ppp_disconnected") {
                    if (af && aj == "connect") {
                        g.getHotspotList({}, function(ap) {
                            var ao = "icon_connection ";
                            var am = "connecting ";
                            for (var an = 0, al = ap.hotspotList.length; an < al; an++) {
                                if (ap.hotspotList[an].connectStatus == "1") {
                                    am = "wifi_connected";
                                    break
                                }
                            }
                            ao += am;
                            ae.connectionCssClass(ao)
                        });
                        ae.rj45ConnectionCssClass(ah);
                        return
                    } else {
                        if (af && (aj == "connecting" || aj == "dhcping")) {
                            ag += "connecting"
                        } else {
                            ag += "disconnect"
                        }
                    }
                } else {
                    ag += "disconnect"
                }
            }
        }
        ae.connectionCssClass(ag);
        ae.rj45ConnectionCssClass(ah)
    }

    function Z() {
        var ad = g.getPhoneBooks({
            page: 0,
            data_per_page: 2000,
            orderBy: "id",
            isAsc: false
        });
        t(ad)
    }

    function F(af, ae, ad) {
        ae = ae.toLowerCase();
        ad = ad ? ad.toLowerCase() : "";
        if (ae == "" || ae == "limited_service" || ae == "no_service" || ae == "limited service" || ae == "no service" || ad != "modem_init_complete") {
            af = "_none"
        }
        return "signal signal" + af
    }

    function m(ad, ae) {
        if (ad) {
            if (ae == 0) {
                return "wifi_status0"
            } else {
                return "wifi_status" + ae
            }
        } else {
            return "wifi_status_off"
        }
    }

    function e(ad, ae) {
        if (ad) {
            if (ae == 0) {
                return "./pic/wlan0.png"
            } else {
                return "./pic/wlan" + ae + ".png"
            }
        } else {
            return "./pic/wlan_off.png"
        }
    }

    function Q() {
        g.getPackSizeInfo({}, function(ae) {
            var ad;
            if (parseInt(ae.fota_pkg_total_size) == 0) {
                ad = 0
            } else {
                ad = parseInt(parseInt(ae.fota_dl_pkg_size) * 100 / parseInt(ae.fota_pkg_total_size))
            }
            if (ad > 100) {
                ad = 100
            }
            if (ad >= 0) {
                if (ad > 95) {
                    showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning"))
                }
                setProgressBar(ad)
            }
        })
    }

    function A() {
        if (w && L.phonebook && L.phonebook.length == 0) {
            w = false;
            if (L.HAS_PHONEBOOK) {
                Z()
            } else {
                L.phonebook = []
            }
        }
        g.getSMSDeliveryReport({
            page: 0,
            smsCount: 10
        }, function(af) {
            var ae = af.messages;
            var ad = [];
            G.each(ae, function(ag, ah) {
                if (G.inArray(ah.number, ad) == -1) {
                    ad.push(ah.number);
                    window.setTimeout(function() {
                        var ai = G.now();
                        Y["m" + ai] = ai;
                        ah.name = ah.number;
                        for (ag in L.phonebook) {
                            if (getLastNumber(L.phonebook[ag].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(ah.number, L.SMS_MATCH_LENGTH)) {
                                ah.name = L.phonebook[ag].pbm_name;
                                break
                            }
                        }
                        var aj = G.i18n.prop("sms_delivery_report_" + ah.content);
                        var ak = {
                            mark: "m" + ai,
                            name: ah.name,
                            title: G.i18n.prop("sms_report"),
                            titleTrans: "sms_report",
                            content: aj,
                            datetime: ah.time,
                            report: "report"
                        };
                        if (H == null) {
                            H = G.template("newMessagePopTmpl", G("#newMessagePopTmpl"))
                        }
                        G(".report", "#buttom-bubble").remove();
                        G.tmpl("newMessagePopTmpl", ak).appendTo("#buttom-bubble")
                    }, 100)
                }
            })
        }, function() {})
    }

    function N(ad) {
        return ad == "modem_sim_undetected" || ad == "modem_undetected" || ad == "modem_sim_destroy" || ad == "modem_waitpin" || ad == "modem_waitpuk" || ad == "modem_imsi_waitnck"
    }

    function E() {
        q = true;
        var ad = g.getNewVersionState();

        function ag() {
            var ah = ["downloading"];
            var ai = g.getCurrentUpgradeState();
            if (ai.current_upgrade_state.toLowerCase() == "idle") {
                addTimeout(ag, 1000)
            } else {
                if ((G.inArray(ai.current_upgrade_state, ah) != -1) && (ad.fota_new_version_state != "already_has_pkg")) {
                    hideLoading();
                    p()
                }
            }
        }
        if (!(G("#progress").is(":visible"))) {
            ag()
        }
        var af = 0;
        var ae = function() {
            var ai = null;
            if (af <= 3) {
                af = af + 1;
                ai = g.getCurrentUpgradeState()
            } else {
                ai = J()
            }
            var ah = ai.current_upgrade_state;
            if (q && S == true) {
                if (ad.fota_new_version_state == "already_has_pkg") {
                    if (ah == "low_battery") {
                        hideProgressBar();
                        q = false;
                        g.removeTimerThings("fota_current_upgrade_state", function() {});
                        showInfo("ota_pkg_low_battery");
                        window.clearTimeout(U);
                        return
                    } else {
                        if (ah == "prepare_install") {
                            hideProgressBar();
                            q = false;
                            g.removeTimerThings("fota_current_upgrade_state", function() {});
                            showInfo("ota_pkg_download_success");
                            window.clearTimeout(U);
                            T = setInterval(function() {
                                a()
                            }, 1000);
                            return
                        }
                    }
                } else {
                    if (ah == "downloading") {
                        Q()
                    } else {
                        if (ah == "download_failed") {
                            hideProgressBar();
                            q = false;
                            showAlert("ota_download_failed");
                            window.clearTimeout(U);
                            return
                        } else {
                            if (ah == "low_battery") {
                                hideProgressBar();
                                q = false;
                                g.removeTimerThings("fota_current_upgrade_state", function() {});
                                showInfo("ota_low_battery");
                                window.clearTimeout(U);
                                return
                            } else {
                                if (ah == "prepare_install") {
                                    hideProgressBar();
                                    q = false;
                                    g.removeTimerThings("fota_current_upgrade_state", function() {});
                                    showInfo("ota_download_success");
                                    window.clearTimeout(U);
                                    T = setInterval(function() {
                                        a()
                                    }, 1000);
                                    return
                                } else {
                                    q = false;
                                    hideProgressBar();
                                    window.clearTimeout(U);
                                    return
                                }
                            }
                        }
                    }
                }
                U = window.setTimeout(ae, 1000)
            }
        };
        if (q && S == true) {
            U = window.setTimeout(ae, 100)
        } else {
            window.clearTimeout(U)
        }
    }

    function r(ae) {
        if ((!(G("#loading").is(":visible"))) && (!(G("#confirm").is(":visible")))) {
            var ad = ae ? "ota_update_success" : "ota_update_failed";
            X = true;
            showAlert(ad, function() {
                X = false;
                if (L.UPGRADE_TYPE == "OTA") {
                    g.clearUpdateResult({}, G.noop())
                }
            })
        } else {
            window.setTimeout(function() {
                r(ae)
            }, 1000)
        }
    }

    function p() {
        var ae = g.getMandatory();
        var ad = ae.is_mandatory;
        var af = g.getPackSizeInfo();
        var ag;
        if (parseInt(af.fota_pkg_total_size) == 0) {
            ag = 0
        } else {
            ag = parseInt(parseInt(af.fota_dl_pkg_size) * 100 / parseInt(af.fota_pkg_total_size))
        }
        if (ag > 100) {
            ag = 100
        }
        if (ad) {
            showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning"))
        } else {
            var ah = "";
            if (L.UPGRADE_TYPE == "OTA") {
                ah = "<br/><br/><button id='btnStopUpgrade' onclick='stopOTAUpgrade();' class='btn-1 btn-primary'>" + G.i18n.prop("cancel") + "</button>"
            }
            showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning") + ah)
        }
        if (ag >= 0) {
            setProgressBar(ag)
        }
    }

    function P() {
        g.setUpgradeSelectOp({
            selectOp: "1"
        }, function(ad) {
            if (ad.result == "success") {
                E()
            }
        })
    }

    function d() {
        g.setUpgradeSelectOp({
            selectOp: "0"
        }, function(ad) {})
    }

    function C(ad) {
        var af = J();
        if (ad) {
            var ae = g.getOpMode();
            if (!checkConnectedStatus(af.connectStatus, ae.rj45_state, af.connectWifiStatus)) {
                showAlert("ota_network_disconnected");
                return
            }
            if (af.fota_user_selector == "none") {
                P()
            } else {
                if (af.fota_user_selector == "accept") {
                    E()
                } else {
                    if (af.fota_user_selector == "cancel") {
                        showAlert("ota_have_cancel")
                    } else {
                        if (af.fota_user_selector == "downloading_cancel") {
                            showAlert("ota_have_cancel")
                        }
                    }
                }
            }
        } else {
            if (af.fota_user_selector == "none") {
                d()
            } else {
                if (af.fota_user_selector == "accept") {
                    E()
                } else {
                    if (af.fota_user_selector == "cancel") {} else {
                        if (af.fota_user_selector == "downloading_cancel") {}
                    }
                }
            }
        }
    }

    function b(af) {
        var ae = af.current_upgrade_state;
        if (ae == "upgrade_pack_redownload") {
            showConfirm("ota_interrupted", {
                ok: function() {
                    C(1)
                },
                no: function() {
                    C(0)
                }
            })
        } else {
            var ad = ["prepare_install", "low_battery", "connecting_server", "connect_server_success", "downloading", "accept"];
            if (G.inArray(ae, ad) != -1) {
                E()
            } else {
                showConfirm(G.i18n.prop("ota_new_version"), {
                    ok: function() {
                        C(1);
                        L.ISNOW_NOTICE = false
                    },
                    no: function() {
                        C(0);
                        L.ISNOW_NOTICE = false
                    }
                })
            }
        }
    }
    showOTAAlert = function() {
        L.ISNOW_NOTICE = true;
        var ad = g.getMandatory().is_mandatory;
        if (ad) {
            E()
        } else {
            var ae = {};
            ae = g.getCurrentUpgradeState();
            b(ae)
        }
    };
    stopOTAUpgrade = function() {
        g.setUpgradeSelectOp({
            selectOp: "2"
        }, function(ad) {});
        q = false;
        window.clearTimeout(U);
        hideLoading();
        showAlert("ota_cancel")
    };

    function f(ad) {
        u = !!ad;
        l = !!ad;
        if (!ad) {
            x = true
        }
    }

    function v(ad) {
        l = !!ad;
        if (!ad) {
            x = true
        }
    }

    function ab(af) {
        var ad = {
            showConfirm: false,
            limitPercent: af.limitVolumePercent
        };
        if (af.limitVolumeType == "1") {
            var ae = parseInt(af.data_counter.monthlySent, 10) + parseInt(af.data_counter.monthlyReceived, 10);
            ad.usedPercent = ae / af.limitVolumeSize * 100;
            if (ad.usedPercent > ad.limitPercent) {
                ad.showConfirm = true;
                ad.type = "data"
            }
        } else {
            ad.usedPercent = af.data_counter.monthlyConnectedTime / af.limitVolumeSize * 100;
            if (ad.usedPercent > ad.limitPercent) {
                ad.showConfirm = true;
                ad.type = "time"
            }
        }
        return ad
    }

    function R() {
        if (L.PRODUCT_TYPE == "DATACARD") {
            G("#statusBar").addClass("padding-right-90");
            G("#language").addClass("data-card-language")
        }
        var ag = G("<img />").attr("src", "pic/res_alert.png");
        var af = G("<img />").attr("src", "pic/res_confirm.png");
        var aj = G("<img />").attr("src", "pic/res_info.png");
        window.setTimeout(function() {
            var al = new M();
            V.applyBindings(al, G("#statusBar")[0]);
            window.setInterval(function() {
                var ap = J();
                var an = ap.roamingStatus ? true : false;
                var ao = G("#langLogoBar");
                S = ap.isLoggedIn;
                al.batteryLevel(ap.batteryLevel + "%");
                al.batteryPers(n(ap.batteryPers, ap.batteryStatus));
                al.batteryStatus(ap.batteryStatus);
                al.isShowFotaNewversionIcon(ap.new_version_state && ap.fota_user_selector && ap.fota_package_already_download != "yes" && L.ISNOW_NOTICE && al.updateType() == "mifi_fota");
                al.isShowRj45ConnectionIcon(L.RJ45_SUPPORT);
                al.networkOperator(o(ap.spn_b1_flag, ap.spn_name_data, ap.spn_b2_flag, ap.networkOperator, an));
                al.networkType(getNetworkType(ap.networkType));
                al.pinStatus(ap.pinStatus);
                al.roamingStatus(ap.roamingStatus ? "R" : "");
                al.showAttachedDevices(ap.wifiStatus);
                al.simStatus(D(ap.simStatus));
                al.signalCssClass(F(ap.signalImg, ap.networkType, ap.simStatus));
                al.isLoggedIn(ap.isLoggedIn);
                al.wifiStatusCssClass(m(ap.wifiStatus, ap.wirelessDeviceNum));
                al.wifiStatusImg(e(ap.wifiStatus, ap.wirelessDeviceNum));
                if (L.HAS_SMS) {
                    if (!h && ap.isLoggedIn) {
                        ak(ap.smsUnreadCount)
                    } else {
                        al.smsUnreadCount(ap.smsUnreadCount)
                    }
                }
                k(al, ap.connectStatus, ap.data_counter, ap.connectWifiSSID, ap.connectWifiStatus, ap.rj45ConnectStatus);
                ae(al, ap.connectStatus, ap.connectWifiSSID, ap.connectWifiStatus);
                checkTrafficLimitAlert(al, ap);
                ad({
                    simStatus: ap.simStatus,
                    wifiStatus: ap.wifiStatus,
                    deviceSize: ap.wirelessDeviceNum,
                    networkType: ap.networkType
                });
                if (ap.isLoggedIn) {
                    G("#statusBar:hidden").show()
                } else {
                    G("#statusBar:visible").hide()
                }
            }, 500);
            if (L.HAS_SMS) {
                window.setInterval(function() {
                    if (al.isLoggedIn()) {
                        ak()
                    }
                }, 10000);
                ai()
            }
            window.setInterval(function() {
                var ao = J();
                var an = ["prepare_install", "low_battery", "download_success", "downloading"];
                if (al.isLoggedIn() == true && !(G("#progress").is(":visible")) && ao.defaultWanName != "") {
                    if (G.inArray(ao.current_upgrade_state, an) != -1) {
                        if (null == q) {
                            if (!ao.is_mandatory) {
                                G.modal.close()
                            }
                            E()
                        } else {
                            if (false == q) {
                                q = null
                            }
                        }
                    }
                }
            }, 1000);
            var am = function() {
                var an = g.getStatusInfo();
                if (an.isLoggedIn) {
                    g.getUpgradeResult({}, function(ao) {
                        if (ao.upgrade_result == "success") {
                            r(true)
                        } else {
                            if (ao.upgrade_result == "fail") {
                                r(false)
                            } else {
                                window.setTimeout(am, 1000)
                            }
                        }
                    }, function() {
                        window.setTimeout(am, 1000)
                    })
                } else {
                    window.setTimeout(am, 1000)
                }
            };
            if (al.updateType() == "mifi_fota") {
                am();
                window.setInterval(function() {
                    var an = J();
                    if (an.isLoggedIn && an.defaultWanName != "") {
                        if (an.new_version_state && an.fota_package_already_download != "yes" && !L.ALREADY_NOTICE) {
                            g.getUpgradeResult({}, function(ao) {
                                if (ao.upgrade_result == "success") {
                                    r(true)
                                } else {
                                    if (ao.upgrade_result == "fail") {
                                        r(false)
                                    } else {
                                        if (X == false) {
                                            L.ALREADY_NOTICE = true;
                                            showOTAAlert()
                                        }
                                    }
                                }
                            })
                        }
                    }
                }, 1000)
            }

            function ak(an) {
                g.getSmsCapability({}, function(ao) {
                    var ap = false;
                    if (ao.nvTotal != 0 && ao.nvUsed >= ao.nvTotal) {
                        G("#sms_unread_count").attr("tipTitle", "sms_capacity_is_full");
                        ap = true
                    } else {
                        if (ao.nvTotal != 0 && ao.nvUsed + 5 >= ao.nvTotal) {
                            G("#sms_unread_count").attr("tipTitle", "sms_capacity_will_full");
                            ap = true
                        } else {
                            G("#sms_unread_count").attr("tipTitle", "sms_unread_count")
                        }
                    }
                    al.showSmsDeleteConfirm(ap);
                    if (typeof an != "undefined") {
                        al.smsUnreadCount(an)
                    }
                    h = true
                })
            }
        }, 1200);
        I.init();

        function ai() {
            var ak = J();
            if (ak.isLoggedIn) {
                g.getSMSReady({}, function(al) {
                    if (al.sms_cmd_status_result == "1") {
                        window.setTimeout(function() {
                            ai()
                        }, 1000)
                    } else {
                        s = true
                    }
                })
            } else {
                window.setTimeout(function() {
                    ai()
                }, 1000)
            }
        }
        checkTrafficLimitAlert = function(an, ao) {
            if (window.location.hash == "#entry") {
                return false
            }
            var ak = L.AP_STATION_SUPPORT ? g.getStatusInfo().ap_station_enable : "undefined";
            var ap = ab(ao);
            var am = G("#confirm-container:visible").length > 0;
            var al = (L.PRODUCT_TYPE == "CPE" && checkCableMode(ao.blc_wan_mode)) ? true : false;
            if (L.AP_STATION_SUPPORT && (typeof ak == "undefined" || ak === "")) {
                g.refreshAPStationStatus({}, G.noop());
                return false
            }
            ak = ak == 1;
            if (!ao.isLoggedIn || am || (u && l) || !ao.limitVolumeEnable || (!ak && !(ao.connectStatus == "ppp_connected")) || al) {
                return false
            }
            if (x) {
                window.setTimeout(function() {
                    x = false
                }, 2000);
                return false
            }
            if (ap.showConfirm) {
                var aq = null;
                if (ap.usedPercent > 100 && !l) {
                    u = true;
                    l = true;
                    aq = {
                        msg: ak ? "traffic_beyond_msg" : "traffic_beyond_disconnect_msg"
                    }
                } else {
                    if (!u) {
                        u = true;
                        l = false;
                        aq = {
                            msg: ak ? "traffic_limit_msg" : "traffic_limit_disconnect_msg",
                            params: [ap.limitPercent]
                        }
                    }
                }
                if (aq != null) {
                    if (ak) {
                        showAlert(aq)
                    } else {
                        showConfirm(aq, function() {
                            showLoading("disconnecting");
                            g.disconnect({}, function(ar) {
                                if (ar.result) {
                                    successOverlay()
                                } else {
                                    errorOverlay()
                                }
                            })
                        })
                    }
                }
            }
            return true
        };

        function ad(ak) {
            G("#statusItemSimStatus").attr("tipTitle", "sim_status_" + ak.simStatus);
            if (ak.wifiStatus) {
                if (ak.deviceSize == 0) {
                    G("#wifi_status").attr("tipTitle", "wifi_status_on")
                } else {
                    G("#wifi_status").attr("tipTitle", "wifi_status" + ak.deviceSize)
                }
            } else {
                G("#wifi_status").attr("tipTitle", "wifi_status_off")
            }
        }

        function ae(am, ak, al, an) {
            am.connectStatus(ak);
            if (ak == "ppp_disconnecting") {
                am.connectStatusTrans("disconnecting");
                am.connectStatusText(G.i18n.prop("disconnecting"))
            } else {
                if (ak == "ppp_connecting") {
                    am.connectStatusTrans("connecting");
                    am.connectStatusText(G.i18n.prop("connecting"))
                } else {
                    if (ak == "ppp_connected") {
                        am.connectStatusTrans("connected");
                        am.connectStatusText(G.i18n.prop("connected"))
                    } else {
                        if (al) {
                            if (an == "dhcping" || an == "connecting") {
                                am.connectStatus("wifi_connecting");
                                am.connectStatusTrans("connecting");
                                am.connectStatusText(G.i18n.prop("connecting"))
                            } else {
                                if (an == "connect") {
                                    am.connectStatus("wifi_connect");
                                    am.connectStatusTrans("connected");
                                    am.connectStatusText(G.i18n.prop("connected"))
                                } else {
                                    am.connectStatus("ppp_disconnected");
                                    am.connectStatusTrans("disconnected");
                                    am.connectStatusText(G.i18n.prop("disconnected"))
                                }
                            }
                        } else {
                            am.connectStatusTrans("disconnected");
                            am.connectStatusText(G.i18n.prop("disconnected"))
                        }
                    }
                }
            }
        }
        getNetworkType = function(al) {
            var ak = al.toLowerCase();
            if (ak == "" || ak == "limited service") {
                ak = "limited_service"
            }
            if (ak == "no service") {
                ak = "no_service"
            }
            if (ak == "limited_service" || ak == "no_service") {
                G("#networkType", "#statusBar").attr("data-trans", "network_type_" + ak);
                return G.i18n.prop("network_type_" + ak)
            } else {
                G("#networkType", "#statusBar").removeAttr("data-trans");
                return al
            }
        };
        if (L.HAS_SMS && W.checkIsMenuExist("sms_list")) {
            window.setInterval(function() {
                var al = J();
                if (window.location.hash == "#entry" || N(al.simStatus)) {
                    return
                }
                for (key in Y) {
                    var am = Y[key];
                    if (G.now() - am > 5000) {
                        delete(Y["m" + am]);
                        var ak = G(".bubbleItem#m" + am, "#buttom-bubble");
                        ak.fadeOut(1000, function() {
                            G(this).remove()
                        })
                    }
                }
                if (al.isLoggedIn) {
                    if (al.newSmsReceived && !z) {
                        z = true;
                        g.resetNewSmsReceivedVar();
                        ah()
                    }
                    if (al.smsReportReceived) {
                        g.resetSmsReportReceivedVar();
                        A()
                    }
                }
            }, 1000);
            if (L.SMS_DATABASE_SORT_SUPPORT) {
                window.setInterval(function() {
                    if (W.checkIsMenuExist("sms_list")) {
                        var ak = J();
                        if (ak.isLoggedIn && s && !z && !N(ak.simStatus)) {
                            z = true;
                            ah()
                        }
                    }
                }, 20001)
            }
        }

        function ah() {
            var al = 1;
            var ak = 5;
            if (!L.dbMsgs || L.dbMsgs.length == 0) {
                ak = 500;
                al = 10
            }
            g.getSMSMessages({
                page: 0,
                smsCount: ak,
                nMessageStoreType: 0,
                tags: al,
                orderBy: "order by id desc"
            }, function(am) {
                if (am && am.messages) {
                    j(am.messages, 0)
                }
                z = false
            });
            g.getSMSMessages({
                page: 0,
                smsCount: ak,
                nMessageStoreType: 1,
                tags: al,
                orderBy: "order by id desc"
            }, function(am) {
                if (am && am.messages) {
                    j(am.messages, 1)
                }
                z = false
            })
        }
        if (L.HAS_SMS) {
            G(".bubbleItem", "#buttom-bubble").live("mouseover", function() {
                var ak = G(this);
                delete(Y[ak.attr("id")])
            }).live("mouseout", function() {
                var al = G(this);
                var ak = G.now();
                Y["m" + ak] = ak;
                al.attr("id", "m" + ak);
                G(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").data("targetid", "m" + ak)
            });
            G(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").die().live("click", function() {
                var al = G(this).data("targetid");
                delete(Y[al]);
                var ak = G(".bubbleItem#" + al, "#buttom-bubble");
                ak.fadeOut(1000, function() {
                    G(this).remove()
                })
            })
        }
    }
    return {
        init: R,
        setTrafficAlertPopuped: f,
        setTrafficAlert100Popuped: v,
        getTrafficResult: ab,
        showOTAAlert: showOTAAlert
    }
});
define("status_traffic_alert", "jquery knockout service statusBar echarts".split(" "), function(h, n, k, f, e) {
    var l = null;
    var o = null;
    var b = false;
    var d = false;
    var j = {
        data: {
            alarm: {
                itemStyle: {
                    normal: {
                        color: "#8CC916"
                    }
                },
                name: "������",
                value: 19.7
            },
            alert: {
                itemStyle: {
                    normal: {
                        color: "#FF5500"
                    }
                },
                name: "����ֵ",
                value: 1
            },
            free: {
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                },
                name: "δʹ��",
                value: 50
            },
            full: {
                itemStyle: {
                    normal: {
                        color: "#DF4313"
                    }
                },
                name: "��������",
                value: 30
            },
            left1: {
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                },
                name: "����ֵ��δʹ��",
                value: 50
            },
            start: {
                itemStyle: {
                    normal: {
                        color: "#D8D8D8"
                    }
                },
                name: "����ֵ��δʹ��",
                value: 50
            },
            used: {
                itemStyle: {
                    normal: {
                        color: "#8CC916"
                    }
                },
                name: "��ʹ��",
                value: 30
            }
        },
        cacheEle: {},
        getEle: function(p) {
            if (this.cacheEle.hasOwnProperty("id")) {
                return this.cacheEle[p]
            } else {
                this.cacheEle[p] = h("#" + p);
                return this.cacheEle[p]
            }
        },
        fetchTrafficAlertInfo: function() {
            o = g();
            return o
        },
        getTrafficStatisticalDatalnfo: function(p) {
            return {
                data: /\d+(.\d+)?/.exec(p)[0],
                unit: /[A-Z]{1,2}/.exec(p)[0]
            }
        },
        getTrafficTimeHours: function(p) {
            var q = p.split(":");
            return {
                h: parseInt(q[0], 10),
                m: parseInt(q[1], 10),
                s: parseInt(q[2], 10)
            }
        },
        getTrafficTimeInfo: function(p) {
            return {
                data: /\d+(.\d+)?/.exec(p)[0],
                unit: /[a-z]{4,6}/.exec(p)[0]
            }
        },
        getTrafficTimeToSeconds: function(q) {
            var p = this.getTrafficTimeHours(q);
            return p.h * 3600 + p.m * 60 + p.s
        },
        getTrafficUnitByScale: function(p) {
            if (p == "1024") {
                return "GB"
            } else {
                if (p == "1048576") {
                    return "TB"
                } else {
                    return "MB"
                }
            }
        },
        getTrafficValueByStatisticalUnit: function(p) {
            p = p.toLowerCase();
            if (p == "minute") {
                return "60"
            } else {
                if (p == "gb") {
                    return "1024"
                } else {
                    if (p == "hour") {
                        return "3600"
                    } else {
                        if (p == "tb") {
                            return "1048576"
                        } else {
                            return "1"
                        }
                    }
                }
            }
        },
        isFormEditable: function(s) {
            var r = s.dataLimitTypeChecked() == "1" && (s.viewEditUsedData() || s.viewEditAlertData() || s.viewEditTotalData());
            var p = s.dataLimitTypeChecked() == "0" && (s.viewEditUsedTime() || s.viewEditAlertTime() || s.viewEditTotalTime());
            if (r || p) {
                h(".border-color-transition:visible").addClass("attention-focus");
                addTimeout(function() {
                    h(".border-color-transition:visible").removeClass("attention-focus")
                }, 1500);
                return true
            } else {
                var q = false;
                if (s.dataLimitTypeChecked() == 1) {
                    if (s.alertDataReach() == "0") {
                        s.editAlertDataHandler();
                        q = true
                    }
                    if (s.limitDataMonth() == "0") {
                        s.editTotalDataHandler();
                        q = true
                    }
                } else {
                    if (s.alertTimeReach() == "0") {
                        s.editAlertTimeHandler();
                        q = true
                    }
                    if (s.limitTimeMonth() == "0") {
                        s.editTotalTimeHandler();
                        q = true
                    }
                }
                if (q) {
                    h(".border-color-transition:visible").addClass("attention-focus");
                    addTimeout(function() {
                        h(".border-color-transition:visible").removeClass("attention-focus")
                    }, 1500)
                }
                return q
            }
        },
        refreshFlowDiagramInfo: function(H) {
            var F = 0;
            var G = 0;
            var w = 0;
            var u = 0;
            var D = 0;
            var p = 0;
            var q = h.i18n.prop("echarts_no");
            if (o.dataLimitChecked == "1") {
                q = h.i18n.prop("echarts_used");
                a.series[0].data = [];
                if (H.dataLimitTypeChecked() == "1") {
                    a.title.text = "";
                    a.series[0].data = [];
                    if (H.limitDataMonth() == 0) {
                        var I = j.data.used;
                        I.value = 1;
                        I.name = h.i18n.prop("echarts_used");
                        I.selected = false;
                        a.series[0].data.push(I)
                    } else {
                        D = H.limitDataMonth() * H.selectedDataUnit() * 1048576;
                        p = parseInt(o.monthlySent, 10) + parseInt(o.monthlyReceived, 10);
                        u = D * H.alertDataReach() / 100;
                        if (p >= D) {
                            var s = j.data.full;
                            s.value = 100;
                            s.name = h.i18n.prop("echarts_full");
                            a.series[0].data.push(s);
                            q = h.i18n.prop("echarts_full")
                        } else {
                            if (u > p) {
                                w = u - p;
                                G = D - u
                            } else {
                                F = p - u;
                                G = D - p
                            }
                            var I = j.data.used;
                            if (u - p > 0) {
                                I.value = p
                            } else {
                                I.value = u
                            }
                            I.name = h.i18n.prop("echarts_used");
                            a.series[0].data.push(I);
                            if (w > 0) {
                                var z = j.data.left1;
                                z.value = w;
                                z.name = h.i18n.prop("echarts_left1");
                                a.series[0].data.push(z)
                            }
                            var v = j.data.alert;
                            v.value = D / 200;
                            v.name = h.i18n.prop("echarts_alert");
                            a.series[0].data.push(v);
                            if (F > 0) {
                                var r = j.data.alarm;
                                r.value = F;
                                r.name = h.i18n.prop("echarts_alarm");
                                a.series[0].data.push(r)
                            }
                            var t = j.data.free;
                            t.value = G;
                            t.name = h.i18n.prop("echarts_free");
                            a.series[0].data.push(t)
                        }
                    }
                } else {
                    a.series[0].data = [];
                    if (H.limitTimeMonth() == 0) {
                        var I = j.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        a.series[0].data.push(I)
                    } else {
                        D = H.limitTimeMonth() * H.selectedTimeUnit();
                        p = o.monthlyConnectedTime;
                        u = D * H.alertTimeReach() / 100;
                        if (p >= D) {
                            var x = j.data.full;
                            x.value = 100;
                            x.name = h.i18n.prop("echarts_full");
                            a.series[0].data.push(x);
                            q = h.i18n.prop("echarts_full")
                        } else {
                            if (u - p > 0) {
                                w = u - p;
                                G = D - u
                            } else {
                                F = p - u;
                                G = D - p
                            }
                            var y = j.data.used;
                            if (u - p > 0) {
                                y.value = p
                            } else {
                                y.value = u
                            }
                            y.name = h.i18n.prop("echarts_used");
                            a.series[0].data.push(y);
                            if (w > 0) {
                                var E = j.data.left1;
                                E.value = w;
                                E.name = h.i18n.prop("echarts_left1");
                                a.series[0].data.push(E)
                            }
                            var C = j.data.alert;
                            C.value = D / 200;
                            C.name = h.i18n.prop("echarts_alert");
                            a.series[0].data.push(C);
                            if (F > 0) {
                                var A = j.data.alarm;
                                A.value = F;
                                A.name = h.i18n.prop("echarts_alarm");
                                a.series[0].data.push(A)
                            }
                            var B = j.data.free;
                            B.value = G;
                            B.name = h.i18n.prop("echarts_free");
                            a.series[0].data.push(B)
                        }
                    }
                }
            } else {
                var I = j.data.used;
                I.value = 1;
                I.selected = false;
                I.name = h.i18n.prop("echarts_no");
                a.series[0].data = [I];
                a.title.text = ""
            }
            j.setFlowDiagramInfo(a, q)
        },
        setFlowDiagramInfo: function(p, q) {
            var s = j.data.start;
            s.name = q;
            s.selected = false;
            s.value = 0;
            var r = [s].concat(p.series[0].data);
            p.series[0].data = r;
            l.setOption(p, true);
            addTimeout(function() {
                l.resize()
            }, 1000)
        }
    };
    var a = {
        animation: false,
        color: ["red", "red", "red", "red", "red"],
        series: [{
            name: "��������",
            radius: ["0", "75"],
            selectedOffset: 3,
            type: "pie",
            data: [],
            itemStyle: {
                normal: {
                    labelLine: {
                        show: false
                    },
                    label: {
                        show: false
                    }
                }
            }
        }],
        title: {
            itemGap: 0,
            text: "",
            subtextStyle: {
                color: "#FFF",
                fontFamily: "΢���ź�",
                fontSize: 16,
                fontWeight: "bolder"
            },
            textStyle: {
                color: "#FFF",
                fontFamily: "΢���ź�",
                fontSize: 20,
                fontWeight: "bolder"
            },
            x: "center",
            y: "center"
        },
        tooltip: {
            formatter: "{b}"
        }
    };

    function g() {
        return k.getTrafficAlertInfo()
    }

    function c() {
        var p = this;
        var V = j.fetchTrafficAlertInfo();
        var A = V.limitDataMonth.split("_");
        b = false;
        d = false;
        p.alertDataReach = n.observable(V.alertDataReach || 0);
        p.alertTimeReach = n.observable(V.alertTimeReach || 0);
        p.dataLimitChecked = n.observable(V.dataLimitChecked == "0" ? "0" : "1");
        p.dataLimitTypeChecked = n.observable(V.dataLimitTypeChecked == "0" ? "0" : "1");
        p.limitTimeMonth = n.observable(V.limitTimeMonth || 0);
        p.usedDataText = n.observable(transUnit(parseInt(V.monthlySent, 10) + parseInt(V.monthlyReceived, 10), false));
        var r = j.getTrafficStatisticalDatalnfo(p.usedDataText());
        var F = r.data;
        p.dataUsed = n.observable(F);
        var B = r.unit;
        p.selectedDataUsedUnit = n.observable(j.getTrafficValueByStatisticalUnit(B));
        p.usedDataTextDescData = n.observable("");
        p.limitDataMonth = n.observable(A[0] || 0);
        p.selectedDataUnit = n.observable(A[1] || 1);
        var I = transUnit(p.limitDataMonth() * p.selectedDataUnit() * 1024 * 1024, false);
        var t = I.substring(I.length - 2);
        p.limitDataMonth(I.substring(0, I.length - 2));
        p.selectedDataUnit(j.getTrafficValueByStatisticalUnit(t));
        p.usedDataTextDesc = n.computed(H);
        p.limitDataMonthDescData = n.observable("");
        p.limitDataMonthDesc = n.computed(Y);
        p.alertDataReachDescData = n.observable("");
        p.alertDataReachDesc = n.computed(R);
        p.leftDataDescData = n.observable("");
        p.leftDataDesc = n.computed(N);
        p.monthlyConnectedTime = n.observable(transSecond2Time(V.monthlyConnectedTime));
        var S = j.getTrafficTimeInfo(transTimeUnit(V.monthlyConnectedTime));
        p.usedTime = n.observable(S.data);
        p.selectedTimeUsedUnit = n.observable(j.getTrafficValueByStatisticalUnit(S.unit));
        p.usedTimeTextDescData = n.observable("");
        p.usedTimeTextDesc = n.computed(T);
        var X = j.getTrafficTimeInfo(transTimeUnit(parseFloat(p.limitTimeMonth()) * 3600));
        p.selectedTimeUnit = n.observable(j.getTrafficValueByStatisticalUnit(X.unit));
        p.limitTimeMonth(X.data);
        p.limitTimeMonthDescData = n.observable("");
        p.limitTimeMonthDescText = n.observable("traffic_limit_time_h");
        p.limitTimeMonthDesc = n.computed(w);
        p.alertTimeReachDescData = n.observable("");
        p.alertTimeReachDesc = n.computed(u);
        p.leftTimeDescData = n.observable("");
        p.leftTimeDesc = n.computed(y);
        p.save = z;
        p.viewEditUsedData = n.observable(false);
        p.editUsedDataHandler = x;
        p.editUsedDataSaveHandler = aa;
        p.saveUsedData = M;
        p.editUsedDataCancelHandler = G;
        p.viewEditTotalData = n.observable(false);
        p.editTotalDataHandler = E;
        p.editTotalDataSaveHandler = s;
        p.editTotalDataCancelHandler = Q;
        p.viewEditAlertData = n.observable(false);
        p.editAlertDataHandler = L;
        p.editAlertDataSaveHandler = q;
        p.editAlertDataCancelHandler = Z;
        p.viewEditUsedTime = n.observable(false);
        p.editUsedTimeHandler = v;
        p.saveUsedTime = J;
        p.editUsedTimeSaveHandler = O;
        p.editUsedTimeCancelHandler = C;
        p.viewEditTotalTime = n.observable(false);
        p.editTotalTimeHandler = D;
        p.editTotalTimeSaveHandler = ab;
        p.editTotalTimeCancelHandler = P;
        p.viewEditAlertTime = n.observable(false);
        p.editAlertTimeHandler = K;
        p.editAlertTimeSaveHandler = U;
        p.editAlertTimeCancelHandler = W;
        j.refreshFlowDiagramInfo(p);

        function R() {
            if (isNaN(p.limitDataMonth() * p.selectedDataUnit() * p.alertDataReach())) {
                p.alertDataReachDescData(p.alertDataReach() + ", ");
                return h.i18n.prop("traffic_alert_reach_text", p.alertDataReach(), " ")
            }
            var ac = transUnit(p.limitDataMonth() * p.selectedDataUnit() * p.alertDataReach() * 1048576 / 100, false);
            p.alertDataReachDescData(p.alertDataReach() + "," + ac);
            return h.i18n.prop("traffic_alert_reach_text", p.alertDataReach(), ac)
        }

        function u() {
            if (isNaN(p.limitTimeMonth() * p.alertTimeReach())) {
                p.alertTimeReachDescData(p.alertTimeReach() + ", ");
                return h.i18n.prop("traffic_alert_reach_text", p.alertTimeReach(), " ")
            }
            var ac = transSecond2Time(p.limitTimeMonth() * p.selectedTimeUnit() * p.alertTimeReach() / 100);
            p.alertTimeReachDescData(p.alertTimeReach() + "," + ac);
            return h.i18n.prop("traffic_alert_reach_text", p.alertTimeReach(), ac)
        }

        function Z() {
            p.alertDataReach(j.getEle("editAlertData").data("oldValue"));
            p.viewEditAlertData(false)
        }

        function L() {
            j.getEle("editAlertData").data("oldValue", p.alertDataReach());
            p.viewEditAlertData(true)
        }

        function q() {
            if (j.getEle("alertDataReach").valid()) {
                p.viewEditAlertData(false)
            }
        }

        function W() {
            p.alertTimeReach(j.getEle("editAlertTime").data("oldValue"));
            p.viewEditAlertTime(false)
        }

        function K() {
            j.getEle("editAlertTime").data("oldValue", p.alertTimeReach());
            p.viewEditAlertTime(true)
        }

        function U() {
            if (j.getEle("alertTimeReach").valid()) {
                p.viewEditAlertTime(false)
            }
        }

        function E() {
            j.getEle("editTotalData").data("oldValue", p.limitDataMonth());
            j.getEle("selectedDataUnit").data("oldValue", p.selectedDataUnit());
            p.viewEditTotalData(true)
        }

        function s() {
            if (j.getEle("limitDataMonth").valid()) {
                p.usedDataText(transUnit(p.limitDataMonth() * p.selectedDataUnit() * 1048576, false));
                p.viewEditTotalData(false)
            }
        }

        function Q() {
            p.limitDataMonth(j.getEle("editTotalData").data("oldValue"));
            p.selectedDataUnit(j.getEle("selectedDataUnit").data("oldValue"));
            p.viewEditTotalData(false)
        }

        function P() {
            p.limitTimeMonth(j.getEle("editTotalTime").data("oldValue"));
            p.viewEditTotalTime(false)
        }

        function D() {
            j.getEle("editTotalTime").data("oldValue", p.limitTimeMonth());
            p.viewEditTotalTime(true)
        }

        function ab() {
            if (j.getEle("limitTimeMonth").valid()) {
                p.viewEditTotalTime(false)
            }
        }

        function G() {
            p.dataUsed(j.getEle("editUsedData").data("oldValue"));
            p.selectedDataUsedUnit(j.getEle("selectedDataUsedUnit").data("oldValue"));
            j.getEle("editUsedDataCancel").siblings("label.error").hide();
            p.viewEditUsedData(false)
        }

        function x() {
            j.getEle("editUsedData").data("oldValue", p.dataUsed());
            j.getEle("selectedDataUsedUnit").data("oldValue", p.selectedDataUsedUnit());
            p.dataUsed(p.dataUsed());
            p.viewEditUsedData(true)
        }

        function aa() {
            if (j.getEle("dataUsed").valid()) {
                b = true;
                p.viewEditUsedData(false)
            }
        }

        function C() {
            p.usedTime(j.getEle("editUsedTime").data("oldValue"));
            p.viewEditUsedTime(false)
        }

        function v() {
            j.getEle("editUsedTime").data("oldValue", p.usedTime());
            p.viewEditUsedTime(true)
        }

        function O() {
            if (j.getEle("usedTime").valid()) {
                p.monthlyConnectedTime(transSecond2Time(parseFloat(p.usedTime()) * p.selectedTimeUsedUnit()));
                p.viewEditUsedTime(false);
                d = true
            }
        }

        function N() {
            var ac = (p.limitDataMonth() * p.selectedDataUnit() - p.dataUsed() * p.selectedDataUsedUnit()) * 1048576;
            if (ac < 0) {
                ac = 0
            }
            if (isNaN(ac)) {
                p.leftDataDescData("");
                return h.i18n.prop("traffic_data_left_text", " ")
            }
            p.leftDataDescData(transUnit(ac, false));
            return h.i18n.prop("traffic_data_left_text", transUnit(ac, false))
        }

        function y() {
            var ac = p.limitTimeMonth() * p.selectedTimeUnit() - j.getTrafficTimeToSeconds(p.monthlyConnectedTime());
            if (ac < 0) {
                ac = 0
            }
            if (isNaN(ac)) {
                p.leftTimeDescData(" ");
                return h.i18n.prop("traffic_data_left_text", " ")
            }
            p.leftTimeDescData(transSecond2Time(ac));
            return h.i18n.prop("traffic_data_left_text", transSecond2Time(ac))
        }

        function Y() {
            if (isNaN(p.limitDataMonth())) {
                p.limitDataMonthDescData("");
                return h.i18n.prop("traffic_limit_data_text", " ")
            } else {}
            p.limitDataMonthDescData(p.limitDataMonth() + j.getTrafficUnitByScale(p.selectedDataUnit()));
            return h.i18n.prop("traffic_limit_data_text", p.limitDataMonth() + j.getTrafficUnitByScale(p.selectedDataUnit()))
        }

        function w() {
            if (isNaN(p.limitTimeMonth())) {
                p.limitTimeMonthDescData(" ");
                p.limitTimeMonthDescText("traffic_limit_time_h");
                return h.i18n.prop("traffic_limit_time_h", " ")
            } else {}
            p.limitTimeMonthDescData(p.limitTimeMonth());
            if (p.selectedTimeUnit() == "60") {
                p.limitTimeMonthDescText("traffic_limit_time_m");
                return h.i18n.prop("traffic_limit_time_m", p.limitTimeMonth())
            } else {
                p.limitTimeMonthDescText("traffic_limit_time_h");
                return h.i18n.prop("traffic_limit_time_h", p.limitTimeMonth())
            }
        }

        function z() {
            if (j.isFormEditable(p) && p.dataLimitChecked() == "1") {
                return false
            }
            if (p.selectedDataUnit() == "1" && p.selectedDataUsedUnit() == "1048576" && p.dataLimitTypeChecked() == "1" && p.dataLimitChecked() == "1" && !(parseInt(p.dataUsed(), 10) < parseInt("4096", 10))) {
                showAlert("traffic_over_note");
                return false
            }
            showLoading();
            k.setTrafficAlertInfo({
                alertDataReach: parseInt(p.alertDataReach(), 10),
                alertTimeReach: parseInt(p.alertTimeReach(), 10),
                dataLimitChecked: p.dataLimitChecked(),
                dataLimitTypeChecked: p.dataLimitTypeChecked(),
                limitDataMonth: p.limitDataMonth() + "_" + p.selectedDataUnit(),
                limitTimeMonth: p.selectedTimeUnit() == "60" ? p.limitTimeMonth() / 60 : p.limitTimeMonth()
            }, function(ac) {
                if (ac.result == "success") {
                    if (p.dataLimitTypeChecked() == "1" && b) {
                        p.saveUsedData()
                    } else {
                        if (p.dataLimitTypeChecked() == "0" && d) {
                            p.saveUsedTime()
                        } else {
                            j.fetchTrafficAlertInfo();
                            j.refreshFlowDiagramInfo(p);
                            f.setTrafficAlertPopuped(false);
                            successOverlay()
                        }
                    }
                } else {
                    errorOverlay()
                }
            }, function() {
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function M() {
            var ac = p.dataUsed() * p.selectedDataUsedUnit();
            k.trafficCalibration({
                way: "data",
                value: ac
            }, function() {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                successOverlay();
                p.viewEditUsedData(false);
                f.setTrafficAlertPopuped(false);
                b = false
            }, function() {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function J() {
            k.trafficCalibration({
                way: "time",
                value: p.selectedTimeUsedUnit() == "60" ? parseFloat(p.usedTime()) / 60 : p.usedTime()
            }, function() {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                successOverlay();
                p.monthlyConnectedTime(transSecond2Time(parseFloat(p.usedTime()) * p.selectedTimeUsedUnit()));
                p.viewEditUsedTime(false);
                f.setTrafficAlertPopuped(false);
                d = false
            }, function() {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function H() {
            if (isNaN(p.dataUsed())) {
                p.usedDataTextDescData("");
                return h.i18n.prop("traffic_used_text", " ")
            }
            p.usedDataTextDescData(p.dataUsed() + j.getTrafficUnitByScale(p.selectedDataUsedUnit()));
            return h.i18n.prop("traffic_used_text", p.dataUsed() + j.getTrafficUnitByScale(p.selectedDataUsedUnit()))
        }

        function T() {
            p.usedTimeTextDescData(p.monthlyConnectedTime());
            return h.i18n.prop("traffic_used_text", p.monthlyConnectedTime())
        }
    }

    function m() {
        l = e.init(h("#traffic_graphic")[0]);
        window.onresize = l.resize;
        var r = h("#container");
        n.cleanNode(r[0]);
        var q = new c();
        n.applyBindings(q, r[0]);
        h("#trafficAlertForm").validate({
            submitHandler: function() {
                q.save()
            },
            errorPlacement: function(t, s) {
                if (s.attr("name") == "alertDataReach") {
                    t.insertAfter("#editAlertDataDiv")
                } else {
                    if (s.attr("name") == "alertTimeReach") {
                        t.insertAfter("#editAlertTimeDiv")
                    } else {
                        if (s.attr("name") == "dataUsed") {
                            t.insertAfter("#editUsedDataDiv")
                        } else {
                            if (s.attr("name") == "limitDataMonth") {
                                t.insertAfter("#editTotalDataDiv")
                            } else {
                                if (s.attr("name") == "limitTimeMonth") {
                                    t.insertAfter("#editTotalTimeDiv")
                                } else {
                                    if (s.attr("name") == "usedTime") {
                                        t.insertAfter("#editUsedTimeDiv")
                                    } else {
                                        t.insertAfter(s)
                                    }
                                }
                            }
                        }
                    }
                }
            },
            rules: {
                alertDataReach: {
                    range: [1, 100],
                    digits: true
                },
                alertTimeReach: {
                    range: [1, 100],
                    digits: true
                },
                dataUsed: {
                    range: [0, 9999],
                    decimalRange: true
                },
                limitDataMonth: {
                    range: [1, 9999],
                    decimalRange: true
                },
                limitTimeMonth: {
                    range: [1, 9999],
                    decimalRange: true
                },
                usedTime: {
                    range: [0, 9999],
                    decimalRange: true
                }
            }
        });
        var p = window.language;
        window.setInterval(function() {
            if (p != window.language) {
                p = window.language;
                j.refreshFlowDiagramInfo(q)
            }
        }, 1000)
    }
    return {
        init: m
    }
});
define("tooltip", ["jquery"], function(b) {
    function a(g, j, f) {
        var l = g.offset().top;
        var k = g.offset().left;
        var e = f.position[0];
        var d = j.outerHeight() + g.outerHeight();
        var h = j.outerWidth() + g.outerWidth();
        l -= j.outerHeight() - f.offset[0];
        k += g.outerWidth() + f.offset[1];
        if (/iPad/i.test(navigator.userAgent)) {
            l -= b(window).scrollTop()
        }
        if (e == "center") {
            l += d / 2
        }
        if (e == "bottom") {
            l += d
        }
        e = f.position[1];
        if (e == "center") {
            k -= h / 2
        } else {
            if (e == "left") {
                k -= h
            }
        }
        return {
            top: l,
            left: k
        }
    }

    function c() {
        b(".statusItem", "#statusBar").each(function(d, f) {
            var e = b(this);
            e.attr("tipTitle", e.attr("title")).removeAttr("title")
        }).hover(function() {
            var e = b(this);
            var f = e.attr("tipTitle");
            var d = b("<div>").addClass("tooltip in").appendTo(document.body).hide().append(e.attr("i18n") ? b.i18n.prop(f) : f);
            if (e.attr("i18n")) {
                d.attr("data-trans", f).attr("id", "tooltip_" + e.attr("id"))
            }
            var g = a(e, d, {
                position: ["bottom", "center"],
                offset: [0, 0]
            });
            d.css({
                position: "absolute",
                top: g.top,
                left: g.left
            }).show()
        }, function() {
            b(".tooltip").hide().remove()
        })
    }
    return {
        init: c
    }
});
define("menu", "set service knockout underscore jquery".split(" "), function(p, r, q, u, j) {
    var k = false;
    var e;
    var f = [];
    var b = "";

    function l(w) {
        for (var v = 0; v < f.length; v++) {
            if (f[v].path == w) {
                return true
            }
        }
        return false
    }

    function m() {
        var v = r.getLoginStatus();
        return (v.status == "loggedIn")
    }

    function s() {
        var v = m();
        var w = u.filter(f, function(x) {
            return (x.level == "1" && ((x.requireLogin && v) || !x.requireLogin) && x.hash != "#entry")
        });
        e.menuMain(w);
        e.loggedIn(v);
        g(e.menuMain().length);
        e.showMenu(v || k);
        j("#nav").translate()
    }

    function g(v) {
        var w = 100 / v;
        j("ul#list-nav li").each(function() {
            j(this).css("width", w + "%")
        })
    }

    function n() {
        var w = window.location.hash;
        var x = u.find(f, function(y) {
            return y.hash == w
        });
        while (x.parent) {
            x = u.find(f, function(y) {
                return y.hash == x.parent
            })
        }
        if (!x.parent) {
            j("#list-nav li").removeClass("active");
            var v = x.hash.substring(1, x.hash.length);
            j("#list-nav li[mid=" + v + "]").addClass("active")
        }
        e.changeMenu(x)
    }

    function o(w) {
        w = w || window.location.hash;
        var v = m();
        return u.filter(f, function(x) {
            return (w == x.hash && ((x.requireLogin && v) || !x.requireLogin))
        })
    }

    function h(x, w) {
        var v = u.find(f, function(y) {
            return y.parent == w.hash && y.path == w.path
        });
        j(".menu-" + x + "-level").removeClass("active");
        if (v) {
            if (x == "two") {
                h("three", v);
                a(v.hash, x)
            }
            j(".menu-" + x + "-level." + v.hash.substring(1)).addClass("active")
        }
    }

    function t() {
        var v = window.location.hash;
        var w = u.find(f, function(x) {
            return x.hash == v
        });
        if (w.level == 1) {
            h("two", w)
        }
        if (w.level == 2) {
            h("three", w);
            a(w.hash, w.level)
        }
        if (w.level == 3) {
            a(w.parent, w.level);
            j(".menu-three-level").removeClass("active");
            j(".menu-three-level." + w.hash.substring(1)).addClass("active")
        }
    }

    function a(w, x) {
        libjqobj = j(".menu-two-level." + w.substring(1));
        var v = ["3", "three", "2", "two"];
        if (u.indexOf(v, x) != -1 && libjqobj.hasClass("active")) {
            return
        }
        libjqobj.siblings().removeClass("active");
        libjqobj.addClass("active");
        libjqobj.siblings().not(".menu-two-level").slideUp();
        libjqobj.next().has("ul li").slideDown()
    }
    p.blc_wan_mode = r.getOpMode().blc_wan_mode;
    if (!p.RJ45_SUPPORT) {
        b = "menu"
    } else {
        switch (p.blc_wan_mode) {
            case "PPPOE":
            case "AUTO_PPPOE":
                b = "menu_pppoe";
                break;
            default:
                b = "menu";
                break
        }
    }
    require([p.DEVICE + "/" + b], function(v) {
        f = v;
        if (p.SD_CARD_SUPPORT) {
            f = f.concat([{
                hash: "#httpshare_guest",
                path: "sd_httpshare",
                level: "",
                requireLogin: false,
                checkSIMStatus: false
            }, {
                hash: "#sdcard",
                path: "sd",
                level: "",
                requireLogin: true,
                checkSIMStatus: false
            }, {
                hash: "#httpshare",
                path: "sd_httpshare",
                level: "",
                requireLogin: true,
                checkSIMStatus: false
            }])
        }
    });

    function d() {
        e = new c()
    }

    function c() {
        var v = m();
        var x = this;
        x.loggedIn = q.observable(v);
        x.showMenu = q.observable(v || k);
        var y = u.filter(f, function(z) {
            return (z.level == "1" && ((z.requireLogin && x.loggedIn()) || !z.requireLogin) && z.hash != "#entry")
        });
        x.menuMain = q.observableArray(y);
        x.secondMenu = q.observableArray([]);
        x.changeMenu = function(z) {
            var A = w(z);
            if (A.length == 0) {
                j("#container").addClass("fixContainerWidth")
            } else {
                j("#container").removeClass("fixContainerWidth")
            }
            x.secondMenu(A);
            return true
        };
        x.thirdMenu = function() {
            return x.curThirdMenu
        };
        x.getThirdMenu = function(z) {
            x.curThirdMenu = w(z)
        };

        function w(z) {
            return u.filter(f, function(A) {
                return ((A.parent && A.parent == z.hash) && ((A.requireLogin && x.loggedIn()) || !A.requireLogin))
            })
        }
    }
    return {
        activeSubMenu: t,
        checkIsMenuExist: l,
        findMenu: o,
        rebuild: s,
        refreshMenu: n,
        init: d
    }
});
