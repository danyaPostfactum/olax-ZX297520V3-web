define("service", "underscore jquery set CryptoJS".split(" "), function(cj, cT, aJ, bx) {
    function bd(dh, dg) {
        if (cj.isArray(dh)) {
            for (var di = 0; di < dh.length; di++) {
                c6(dh[di])
            }
        } else {
            c6(dh)
        }
        cU(dg)
    }

    function m(dh, dg) {
        if (cj.isArray(dh)) {
            for (var di = 0; di < dh.length; di++) {
                br(dh[di])
            }
        } else {
            br(dh)
        }
        C(dg)
    }

    function aT() {
        return a3({}).get_user_mac_addr
    }

    function bV(dg, dj) {
        return bB(arguments, {}, dh, di, null, false);

        function dh(dk, dl) {
            return {
                multi_data: 1,
                cmd: "DDNS_Enable,DDNS_Mode,DDNSProvider,DDNSAccount,DDNSPassword,DDNS,DDNS_Hash_Value"
            }
        }

        function di(dk) {
            if (dk) {
                return {
                    DDNS_Enable: dk.DDNS_Enable,
                    DDNS_Mode: dk.DDNS_Mode,
                    DDNSProvider: dk.DDNSProvider,
                    DDNSAccount: dk.DDNSAccount,
                    DDNSPassword: dk.DDNSPassword,
                    DDNS: dk.DDNS,
                    DDNS_Hash_Value: dk.DDNS_Hash_Value
                }
            } else {
                return X
            }
        }
    }

    function aU() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = cT.extend({}, di);
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cm() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "modem_main_state,puknumber,pinnumber,blc_wan_mode,blc_wan_auto_mode,psw_fail_num_str,login_lock_time,psw_changed";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                if (di.blc_wan_mode == "AUTO") {
                    di.blc_wan_mode = di.blc_wan_auto_mode ? di.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    di.blc_wan_mode = di.blc_wan_mode ? di.blc_wan_mode : "PPP"
                }
                di.psw_fail_num_str = di.psw_fail_num_str == "" ? aJ.MAX_LOGIN_COUNT : di.psw_fail_num_str;
                di.login_lock_time = di.login_lock_time == "" ? "300" : di.login_lock_time;
                return di
            } else {
                return X
            }
        }
    }

    function aQ() {
        return bB(arguments, {}, dg, dh, {
            errorType: "badPassword"
        }, true);

        function dg(di, dj) {
            var dk = {
                goformId: "LOGIN",
                password: aJ.PASSWORD_ENCODE ? Base64.encode(di.password) : di.password
            };
            return dk
        }

        function dh(di) {
            if (di && (di.result == "0" || di.result == "4")) {
                bw.isLoggedIn = true;
                return {
                    result: true
                }
            } else {
                var dj = {};
                switch (di.result) {
                    case "1":
                        dj = {
                            errorType: "Login Fail"
                        };
                        break;
                    case "2":
                        dj = {
                            errorType: "duplicateUser"
                        };
                        break;
                    case "3":
                        dj = {
                            errorType: "badPassword"
                        };
                        break;
                    default:
                        dj = {
                            errorType: "Login Fail"
                        };
                        break
                }
                bw.isLoggedIn = false;
                return cT.extend(X, dj)
            }
        }
    }

    function bf() {
        if (bw.isLoggedIn != undefined) {
            return bB(arguments, {
                status: bw.isLoggedIn ? "loggedIn" : "loggedOut"
            })
        } else {
            var di = {};
            if (!aJ.HAS_LOGIN) {
                di.status = "loggedIn";
                di.errorType = "no_login";
                bw.isLoggedIn = true
            }
            return bB(arguments, di, dg, dh, null, false)
        }

        function dg(dj, dk) {
            var dl = {};
            dl.cmd = "loginfo";
            dl.multi_data = 1;
            return dl
        }

        function dh(dk) {
            if (dk && dk.loginfo || dk.loginfo == "") {
                var dj = {};
                switch (dk.loginfo) {
                    case "ok":
                        bw.isLoggedIn = true;
                        dj.status = "loggedIn";
                        break;
                    default:
                        bw.isLoggedIn = false;
                        dj.status = "loggedOut";
                        break
                }
                return dj
            } else {
                bw.isLoggedIn = undefined;
                return cT.extend(X, {
                    errorType: "LoginStatusError"
                })
            }
        }
    }

    function J() {
        return bB(arguments, {}, dg, dh, {}, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ENTER_PIN";
            dk.PinNumber = di.PinNumber;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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

    function V() {
        return bB(arguments, {}, dg, dh, {}, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ENTER_PUK";
            dk.PUKNumber = di.PUKNumber;
            dk.PinNumber = di.PinNumber;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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
        if (bw.isLoggedIn === undefined) {
            var dg = bf();
            return {
                networkType: bw.networkType,
                signalImg: bw.signalImg,
                networkOperator: bw.networkOperator,
                spn_b1_flag: bw.spn_b1_flag,
                spn_name_data: bw.spn_name_data,
                spn_b2_flag: bw.spn_b2_flag,
                connectStatus: bw.connectStatus,
                rj45ConnectStatus: bw.rj45ConnectStatus,
                ssid1AttachedNum: bw.ssid1AttachedNum,
                ssid2AttachedNum: bw.ssid2AttachedNum,
                wirelessDeviceNum: bw.ssid1AttachedNum + bw.ssid2AttachedNum,
                roamingStatus: bw.roamingStatus,
                wifiStatus: bw.wifiStatus,
                simStatus: bw.simStatus,
                pinStatus: bw.pinStatus,
                batteryStatus: bw.batteryStatus,
                batteryLevel: bw.batteryLevel,
                batteryPers: bw.batteryPers,
                batteryTime: bw.batteryTime,
                ssid: bw.ssid,
                authMode: bw.authMode,
                data_counter: bw.data_counter,
                isLoggedIn: dg.status == "loggedIn",
                newSmsReceived: bw.newSmsReceived,
                smsReportReceived: bw.smsReportReceived,
                smsUnreadCount: bw.smsUnreadCount,
                limitVolumeEnable: bw.limitVolumeEnable,
                limitVolumeType: bw.limitVolumeType,
                limitVolumePercent: bw.limitVolumePercent,
                limitVolumeSize: bw.limitVolumeSize,
                connectWifiProfile: bw.connectWifiProfile,
                connectWifiSSID: bw.connectWifiSSID,
                connectWifiStatus: bw.connectWifiStatus,
                multi_ssid_enable: bw.multi_ssid_enable,
                roamMode: bw.roamMode,
                blc_wan_mode: bw.blc_wan_mode,
                current_upgrade_state: bw.current_upgrade_state,
                is_mandatory: bw.is_mandatory,
                new_version_state: bw.new_version_state,
                allowRoamingUpdate: bw.allowRoamingUpdate,
                ap_station_enable: bw.ap_station_enable,
                ap_station_mode: bw.ap_station_mode,
                dialMode: bw.dialMode,
                fota_package_already_download: bw.fota_package_already_download,
                ethWanMode: bw.ethWanMode,
                fota_user_selector: bw.fota_user_selector,
                defaultWanName: bw.defaultWanName
            }
        }
        return {
            networkType: bw.networkType,
            signalImg: bw.signalImg,
            networkOperator: bw.networkOperator,
            spn_b1_flag: bw.spn_b1_flag,
            spn_name_data: bw.spn_name_data,
            spn_b2_flag: bw.spn_b2_flag,
            connectStatus: bw.connectStatus,
            rj45ConnectStatus: bw.rj45ConnectStatus,
            ssid1AttachedNum: bw.ssid1AttachedNum,
            ssid2AttachedNum: bw.ssid2AttachedNum,
            wirelessDeviceNum: bw.ssid1AttachedNum + bw.ssid2AttachedNum,
            roamingStatus: bw.roamingStatus,
            wifiStatus: bw.wifiStatus,
            simStatus: bw.simStatus,
            pinStatus: bw.pinStatus,
            batteryStatus: bw.batteryStatus,
            batteryLevel: bw.batteryLevel,
            batteryPers: bw.batteryPers,
            batteryTime: bw.batteryTime,
            ssid: bw.ssid,
            authMode: bw.authMode,
            data_counter: bw.data_counter,
            isLoggedIn: bw.isLoggedIn,
            newSmsReceived: bw.newSmsReceived,
            smsReportReceived: bw.smsReportReceived,
            smsUnreadCount: bw.smsUnreadCount,
            limitVolumeEnable: bw.limitVolumeEnable,
            limitVolumeType: bw.limitVolumeType,
            limitVolumePercent: bw.limitVolumePercent,
            limitVolumeSize: bw.limitVolumeSize,
            connectWifiProfile: bw.connectWifiProfile,
            connectWifiSSID: bw.connectWifiSSID,
            connectWifiStatus: bw.connectWifiStatus,
            multi_ssid_enable: bw.multi_ssid_enable,
            blc_wan_mode: bw.blc_wan_mode,
            roamMode: bw.roamMode,
            current_upgrade_state: bw.current_upgrade_state,
            is_mandatory: bw.is_mandatory,
            new_version_state: bw.new_version_state,
            allowRoamingUpdate: bw.allowRoamingUpdate,
            ap_station_enable: bw.ap_station_enable,
            ap_station_mode: bw.ap_station_mode,
            dialMode: bw.dialMode,
            fota_package_already_download: bw.fota_package_already_download,
            ethWanMode: bw.ethWanMode,
            fota_user_selector: bw.fota_user_selector,
            defaultWanName: bw.defaultWanName
        }
    }

    function bA() {
        var dh = bw.limitVolumeType == "1";
        var dg = {
            data_counter: bw.data_counter,
            connectStatus: bw.connectStatus,
            rj45ConnectStatus: bw.rj45ConnectStatus,
            limitVolumeEnable: bw.limitVolumeEnable,
            limitVolumeType: bw.limitVolumeType,
            limitVolumePercent: bw.limitVolumePercent,
            networkType: bw.networkType
        };
        if (dh) {
            dg.limitDataMonth = bw.limitVolumeSize;
            dg.limitTimeMonth = 0
        } else {
            dg.limitTimeMonth = bw.limitVolumeSize;
            dg.limitDataMonth = 0
        }
        dg.blc_wan_mode = bw.blc_wan_mode;
        return dg
    }

    function E() {
        bw.newSmsReceived = false
    }

    function b6() {
        bw.smsReportReceived = false
    }

    function b() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "sms_capacity_info";
            return dk
        }

        function dh(di) {
            return {
                nvTotal: parseInt(di.sms_nv_total, 10),
                nvUsed: parseInt(di.sms_nv_rev_total, 10) + parseInt(di.sms_nv_send_total, 10) + parseInt(di.sms_nv_draftbox_total, 10),
                simTotal: parseInt(di.sms_sim_total, 10),
                simUsed: parseInt(di.sms_sim_rev_total, 10) + parseInt(di.sms_sim_send_total, 10) + parseInt(di.sms_sim_draftbox_total, 10),
                nvReceive: parseInt(di.sms_nv_rev_total, 10),
                nvSend: parseInt(di.sms_nv_send_total, 10),
                nvDraft: parseInt(di.sms_nv_draftbox_total, 10),
                simReceive: parseInt(di.sms_sim_rev_total, 10),
                simSend: parseInt(di.sms_sim_send_total, 10),
                simDraft: parseInt(di.sms_sim_draftbox_total, 10)
            }
        }
    }

    function a9() {
        var dk = arguments[1];
        var dj = 0;
        return bB(arguments, {}, dg, di, null, true);

        function dg(dl, dm) {
            var dn = {};
            dn.notCallback = true;
            dn.goformId = "CONNECT_NETWORK";
            return dn
        }

        function di(dl) {
            if (dl.result == "success") {
                dj = new Date().getTime();
                cU(dh)
            } else {
                dk({
                    result: false
                })
            }
        }

        function dh(dl) {
            if (dl.ppp_status == "ppp_connecting") {
                bw.connectStatus = "ppp_connecting"
            } else {
                if (dl.ppp_status == "ppp_connected") {
                    C(dh);
                    bw.connectStatus = "ppp_connected";
                    dk({
                        result: true,
                        status: bw.connectStatus
                    })
                } else {
                    if (new Date().getTime() - dj < 10000) {
                        bw.connectStatus = "ppp_connecting"
                    } else {
                        C(dh);
                        dk({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function R() {
        var dk = arguments[1];
        var dj = 0;
        return bB(arguments, {}, dh, di, null, true);

        function dh(dl, dm) {
            var dn = {};
            dn.notCallback = true;
            dn.goformId = "DISCONNECT_NETWORK";
            return dn
        }

        function di(dl) {
            if (dl.result == "success") {
                dj = new Date().getTime();
                cU(dg)
            } else {
                dk({
                    result: false
                })
            }
        }

        function dg(dl) {
            if (dl.ppp_status == "ppp_disconnecting") {
                bw.connectStatus = "ppp_disconnecting"
            } else {
                if (dl.ppp_status == "ppp_disconnected") {
                    C(dg);
                    bw.connectStatus = "ppp_disconnected";
                    dk({
                        result: true,
                        status: bw.connectStatus
                    })
                } else {
                    if (new Date().getTime() - dj < 10000) {
                        bw.connectStatus = "ppp_disconnecting"
                    } else {
                        C(dg);
                        dk({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function l() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19,m_profile_name,profile_name,wan_dial,pdp_type,pdp_select,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passtmp,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passtmp,apn_num_preset";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return {
                    APNs: di.APN_configtmp0 + "||" + di.APN_configtmp1 + "||" + di.APN_configtmp2 + "||" + di.APN_configtmp3 + "||" + di.APN_configtmp4 + "||" + di.APN_configtmp5 + "||" + di.APN_configtmp6 + "||" + di.APN_configtmp7 + "||" + di.APN_configtmp8 + "||" + di.APN_configtmp9 + "||" + di.APN_configtmp10 + "||" + di.APN_configtmp11 + "||" + di.APN_configtmp12 + "||" + di.APN_configtmp13 + "||" + di.APN_configtmp14 + "||" + di.APN_configtmp15 + "||" + di.APN_configtmp16 + "||" + di.APN_configtmp17 + "||" + di.APN_configtmp18 + "||" + di.APN_configtmp19,
                    ipv6APNs: di.ipv6_APN_configtmp0 + "||" + di.ipv6_APN_configtmp1 + "||" + di.ipv6_APN_configtmp2 + "||" + di.ipv6_APN_configtmp3 + "||" + di.ipv6_APN_configtmp4 + "||" + di.ipv6_APN_configtmp5 + "||" + di.ipv6_APN_configtmp6 + "||" + di.ipv6_APN_configtmp7 + "||" + di.ipv6_APN_configtmp8 + "||" + di.ipv6_APN_configtmp9 + "||" + di.ipv6_APN_configtmp10 + "||" + di.ipv6_APN_configtmp11 + "||" + di.ipv6_APN_configtmp12 + "||" + di.ipv6_APN_configtmp13 + "||" + di.ipv6_APN_configtmp14 + "||" + di.ipv6_APN_configtmp15 + "||" + di.ipv6_APN_configtmp16 + "||" + di.ipv6_APN_configtmp17 + "||" + di.ipv6_APN_configtmp18 + "||" + di.ipv6_APN_configtmp19,
                    apnMode: di.apn_mode,
                    profileName: di.m_profile_name || di.profile_name,
                    wanDial: di.wan_dial,
                    pdpType: di.pdp_type == "IP" ? "IP" : di.ipv6_pdp_type,
                    pdpSelect: di.pdp_select,
                    index: di.index,
                    currIndex: di.Current_index,
                    autoApns: di.apn_auto_config,
                    autoApnsV6: di.ipv6_apn_auto_config,
                    wanApn: di.wan_apn,
                    authMode: di.ppp_auth_mode.toLowerCase(),
                    username: di.ppp_username,
                    password: di.ppp_passtmp,
                    dnsMode: "",
                    dns1: "",
                    dns2: "",
                    wanApnV6: di.ipv6_wan_apn,
                    authModeV6: di.ipv6_ppp_auth_mode.toLowerCase(),
                    usernameV6: di.ipv6_ppp_username,
                    passwordV6: di.ipv6_ppp_passtmp,
                    dnsModeV6: "",
                    dns1V6: "",
                    dns2V6: "",
                    apnNumPreset: di.apn_num_preset
                }
            } else {
                return {
                    result: false
                }
            }
        }
    }

    function aB() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                apn_action: "delete",
                apn_mode: "manual",
                index: di.index
            };
            dk.goformId = "APN_PROC_EX";
            return dk
        }

        function dh(di) {
            if (di.result == "success") {
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

    function bz() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dk) {
            var dj = {
                goformId: "APN_PROC_EX",
                apn_mode: di.apnMode
            };
            if (di.apnMode == "manual") {
                dj.apn_action = "set_default";
                dj.set_default_flag = "1";
                dj.pdp_type = di.pdpType;
                dj.index = di.index
            }
            return dj
        }

        function dh(di) {
            if (di.result == "success") {
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

    function bq() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "APN_PROC_EX",
                apn_action: "save",
                apn_mode: "manual",
                profile_name: di.profileName,
                wan_dial: "*99#",
                pdp_type: di.pdpType,
                pdp_select: "auto",
                index: di.index
            };
            if (di.pdpType == "IP") {
                cT.extend(dk, {
                    wan_apn: di.wanApn,
                    ppp_auth_mode: di.authMode,
                    ppp_username: di.username,
                    ppp_passtmp: di.password
                })
            } else {
                if (di.pdpType == "IPv6") {
                    cT.extend(dk, {
                        ipv6_wan_apn: di.wanApnV6,
                        ipv6_ppp_auth_mode: di.authModeV6,
                        ipv6_ppp_username: di.usernameV6,
                        ipv6_ppp_passtmp: di.passwordV6
                    })
                } else {
                    cT.extend(dk, {
                        wan_apn: di.wanApn,
                        ppp_auth_mode: di.authMode,
                        ppp_username: di.username,
                        ppp_passtmp: di.password,
                        dns_mode: di.dnsMode,
                        prefer_dns_manual: di.dns1,
                        standby_dns_manual: di.dns2,
                        ipv6_wan_apn: di.wanApnV6,
                        ipv6_ppp_auth_mode: di.authModeV6,
                        ipv6_ppp_username: di.usernameV6,
                        ipv6_ppp_passtmp: di.passwordV6
                    })
                }
            }
            return dk
        }

        function dh(di) {
            if (di.result == "success") {
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
    var c1 = ["modem_main_state", "pin_status", "blc_wan_mode", "blc_wan_auto_mode", "loginfo", "fota_new_version_state", "fota_current_upgrade_state", "fota_upgrade_selector", "network_provider", "is_mandatory", "sta_count", "m_sta_count"];
    var ay = ["signalbar", "network_type", "sub_network_type", "ppp_status", "rj45_state", "EX_SSID1", "sta_ip_status", "EX_wifi_profile", "m_ssid_enable", "wifi_cur_state", "SSID1", "simcard_roam", "lan_ipaddr", "battery_charging", "battery_vol_percent", "battery_pers", "spn_name_data", "spn_b1_flag", "spn_b2_flag", "realtime_tx_bytes", "realtime_rx_bytes", "realtime_time", "realtime_tx_thrpt", "realtime_rx_thrpt", "monthly_rx_bytes", "monthly_tx_bytes", "traffic_alined_delta", "monthly_time", "date_month", "data_volume_limit_switch", "data_volume_limit_size", "data_volume_alert_percent", "data_volume_limit_unit", "roam_setting_option", "upg_roam_switch", "fota_package_already_download", "ssid", "dial_mode", "ethwan_mode", "default_wan_name"];
    if (aJ.HAS_SMS) {
        cT.merge(ay, ["sms_received_flag", "sts_received_flag", "sms_unread_num"])
    }
    var aV = [];
    var bO = [bp];

    function aW() {
        if (!cS) {
            setTimeout(function() {
                aW()
            }, 1000);
            return
        }
        var dg = cz();
        dc(dg, function(dh) {
            for (var di = 0; di < bO.length; di++) {
                if (typeof bO[di] === "function") {
                    bO[di](dh)
                }
            }
            cT.merge(bO, aV);
            aV = [];
            setTimeout(function() {
                aW()
            }, 1000)
        }, function() {
            cO();
            setTimeout(function() {
                aW()
            }, 1000)
        }, false)
    }

    function cz() {
        var dg = {
            multi_data: 1
        };
        if (window.location.hash && window.location.hash != "#entry" && bw.isLoggedIn) {
            if (aJ.HAS_SMS) {
                dg.sms_received_flag_flag = 0;
                dg.sts_received_flag_flag = 0
            }
            if (ay.length > 0 && cj.indexOf(c1, ay[0]) == -1) {
                cT.each(ay, function(dh, di) {
                    c1.push(di)
                })
            }
        } else {
            if (ay.length > 0 && cj.indexOf(c1, ay[0]) != -1) {
                c1 = cj.without(c1, ay)
            }
        }
        dg.cmd = c1.join(",");
        return dg
    }

    function cU(dg) {
        if (cj.indexOf(aV, dg) == -1) {
            aV.push(dg)
        }
    }

    function C(dg) {
        bO = cj.without(bO, dg);
        if (bO.length == 0) {
            bO.push(bp)
        }
        return aV
    }

    function c6(dg) {
        if (cj.indexOf(c1, dg) == -1) {
            c1.push(dg)
        }
    }

    function br(dg) {
        c1 = cj.without(c1, dg);
        return c1
    }

    function bp(dh) {
        bw.defaultWanName = dh.default_wan_name;
        bw.signalImg = typeof dh.signalbar == "undefined" ? "0" : dh.signalbar;
        bw.networkType = dh.sub_network_type ? dh.sub_network_type : (dh.network_type ? dh.network_type : "");
        if (bw.networkType.toLowerCase().indexOf("limited_service") != -1 || bw.networkType.toLowerCase().indexOf("limited service") != -1) {
            bw.networkType = "limited_service"
        } else {
            if (bw.networkType.toLowerCase().indexOf("no_service") != -1 || bw.networkType.toLowerCase().indexOf("no service") != -1) {
                bw.networkType = "no_service"
            }
        }
        bw.networkOperator = dh.network_provider ? dh.network_provider : "";
        bw.spn_b1_flag = dh.spn_b1_flag;
        bw.spn_b2_flag = dh.spn_b2_flag;
        bw.spn_name_data = dh.spn_name_data;
        bw.connectStatus = typeof dh.ppp_status == "undefined" ? "ppp_disconnected" : dh.ppp_status;
        bw.rj45ConnectStatus = (typeof dh.rj45_state == "undefined" || dh.rj45_state == "") ? "dead" : dh.rj45_state;
        bw.ethWanMode = dh.ethwan_mode;
        bw.ssid1AttachedNum = dh.sta_count == "" ? 0 : parseInt(dh.sta_count, 10);
        bw.ssid2AttachedNum = dh.m_sta_count == "" ? 0 : parseInt(dh.m_sta_count, 10);
        bw.roamingStatus = aG(bw.networkType, dh.modem_main_state, dh.simcard_roam);
        bw.wifiStatus = dh.wifi_cur_state == "1";
        bw.simStatus = dh.modem_main_state;
        bw.pinStatus = dh.pin_status;
        var di = 3 * 60 * 60;
        var dg = (dh.battery_vol_percent && dh.battery_vol_percent.length > 0) ? dh.battery_vol_percent : 100;
        bw.batteryPers = dh.battery_pers;
        var dj = Math.round(di * (1 - dg / 100));
        bw.batteryStatus = (typeof dh.battery_charging == "undefined") ? "0" : dh.battery_charging;
        bw.batteryLevel = dg;
        bw.batteryTime = dj.toString();
        bw.data_counter = {
            uploadRate: dh.realtime_tx_thrpt == "" ? 0 : dh.realtime_tx_thrpt,
            downloadRate: dh.realtime_rx_thrpt == "" ? 0 : dh.realtime_rx_thrpt,
            currentSent: dh.realtime_tx_bytes == "" ? 0 : dh.realtime_tx_bytes,
            currentReceived: dh.realtime_rx_bytes == "" ? 0 : dh.realtime_rx_bytes,
            currentConnectedTime: dh.realtime_time == "" ? 0 : dh.realtime_time,
            monthlySent: dh.monthly_tx_bytes == "" ? 0 : dh.monthly_tx_bytes,
            monthlyReceived: dh.monthly_rx_bytes == "" ? 0 : dh.monthly_rx_bytes,
            traffic_alined_delta: dh.traffic_alined_delta == "" ? 0 : dh.traffic_alined_delta,
            monthlyConnectedTime: dh.monthly_time == "" ? 0 : dh.monthly_time,
            month: dh.date_month == "" ? 1 : dh.date_month
        };
        bw.ssid = dh.SSID1;
        bw.authMode = dh.AuthMode;
        bw.isLoggedIn = aJ.HAS_LOGIN ? dh.loginfo == "ok" : true;
        if (aJ.HAS_SMS) {
            if (!bw.newSmsReceived) {
                bw.newSmsReceived = dh.sms_received_flag > 0
            }
            if (!bw.smsReportReceived) {
                bw.smsReportReceived = dh.sts_received_flag > 0
            }
            if (typeof dh.sms_dev_unread_num != "undefined") {
                bw.smsUnreadCount = aJ.SMS_UNREAD_NUM_INCLUDE_SIM ? parseInt(dh.sms_dev_unread_num | 0, 10) + parseInt(dh.sms_sim_unread_num | 0, 10) : parseInt(dh.sms_dev_unread_num | 0, 10)
            } else {
                bw.smsUnreadCount = parseInt(dh.sms_unread_num | 0, 10)
            }
        }
        if (dh.data_volume_limit_switch == "1") {
            bw.limitVolumeEnable = true;
            bw.limitVolumeType = dh.data_volume_limit_unit == "data" ? "1" : "0";
            bw.limitVolumePercent = dh.data_volume_alert_percent;
            if (dh.data_volume_limit_unit == "data") {
                var dk = dh.data_volume_limit_size.split("_");
                bw.limitVolumeSize = dk[0] * dk[1] * 1024 * 1024
            } else {
                bw.limitVolumeSize = dh.data_volume_limit_size * 60 * 60
            }
        } else {
            bw.limitVolumeEnable = false;
            bw.limitVolumeType = "1";
            bw.limitVolumePercent = "100";
            bw.limitVolumeSize = "0"
        }
        bw.connectWifiProfile = dh.EX_wifi_profile;
        bw.connectWifiSSID = dh.EX_SSID1;
        bw.connectWifiStatus = dh.sta_ip_status;
        bw.multi_ssid_enable = dh.m_ssid_enable;
        bw.roamMode = dh.roam_setting_option;
        if (dh.blc_wan_mode == "AUTO") {
            bw.blc_wan_mode = dh.blc_wan_auto_mode ? dh.blc_wan_auto_mode : "AUTO_PPP"
        } else {
            bw.blc_wan_mode = dh.blc_wan_mode ? dh.blc_wan_mode : "PPP"
        }
        bw.new_version_state = dh.fota_new_version_state == "has_critical" || dh.fota_new_version_state == "has_optional" || dh.fota_new_version_state == "already_has_pkg";
        bw.current_upgrade_state = dh.fota_current_upgrade_state;
        if (bw.current_upgrade_state == "verify_failed") {
            bw.current_upgrade_state = "upgrade_pack_error"
        }
        bw.fota_user_selector = dh.fota_upgrade_selector;
        bw.is_mandatory = dh.is_mandatory == "1" || dh.fota_new_version_state == "has_critical";
        bw.allowRoamingUpdate = dh.upg_roam_switch;
        bw.dialMode = dh.dial_mode;
        bw.fota_package_already_download = dh.fota_package_already_download
    }

    function cO() {
        bw.batteryStatus = "0"
    }

    function aG(dh, dg, di) {
        if (("" == cT.trim(dh)) || "no_service" == dh.toLowerCase() || "limited_service" == dh.toLowerCase() || "modem_sim_undetected" == dg || "modem_waitpin" == dg || "modem_waitpuk" == dg) {
            return false
        }
        if ("Internal" == di || "International" == di) {
            return true
        } else {
            return false
        }
    }
    cT(document).ready(function() {
        setTimeout(function() {
            aW()
        }, 0)
    });

    function bo(dh, dg, dj, dl) {
        if ((typeof(dh) !== "string") || (dh === "") || (typeof(dg) !== "number") || (isNaN(dg))) {
            if (typeof(dl) === "function") {
                dl(false);
                return
            }
        }
        var dk = -1;
        if (dg === 0) {
            dk = 0
        } else {
            if (dg === 2) {
                dk = 2
            } else {
                if (dg == 7) {
                    dk = 7
                } else {
                    dk = -1
                }
            }
        }
        if (-1 === dk) {
            if (typeof(dl) === "function") {
                dl(false);
                return
            }
        }
        var di;
        if (dj.toString() == "NaN") {
            di = ""
        } else {
            di = dj
        }
        dc({
            goformId: "SET_NETWORK",
            NetworkNumber: dh,
            Rat: dg,
            nSubrat: di
        }, function(dp) {
            if (dp && dp.result == "success") {
                var dn;
                var dm = 0;
                var dq = setInterval(function() {
                    var dr = cy({
                        cmd: "m_netselect_result"
                    }, false);
                    if (!dr) {
                        dl(false);
                        return
                    }
                    if (dr.m_netselect_result == "manual_success") {
                        dn = "1";
                        window.clearInterval(dq);
                        dl(true)
                    } else {
                        if (dr.m_netselect_result == "manual_fail") {
                            dn = "0";
                            window.clearInterval(dq);
                            dl(false)
                        } else {
                            if (dm < 120) {
                                dm++
                            } else {
                                window.clearInterval(dq);
                                dl(false)
                            }
                        }
                    }
                }, 1000)
            } else {
                dl(false)
            }
        }, function(dm) {
            dl(false)
        }, true)
    }

    function cL() {
        var dj = arguments[1];
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk, dl) {
            var dm = {};
            dm.notCallback = true;
            dm.goformId = "PBM_CONTACT_ADD";
            dm.location = dk.location;
            dm.name = encodeMessage(dk.name);
            dm.mobilephone_num = dk.mobile_phone_number;
            if (dm.location == 1) {
                dm.add_index_pc = dk.index;
                dm.homephone_num = dk.home_phone_number;
                dm.officephone_num = dk.office_phone_number;
                dm.email = encodeMessage(dk.mail);
                dm.groupchoose = dk.group;
                if (!dm.groupchoose) {
                    dm.groupchoose = "common"
                }
            } else {
                dm.edit_index = dk.index
            }
            if (dk.delId != undefined) {
                dm.delId = dk.delId
            }
            return dm
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                bd("pbm_write_flag", dg)
            } else {
                dj(dk)
            }
        }

        function dg(dk) {
            a2(dk, dj, dg)
        }
    }

    function a2(dg, di, dh) {
        if (dg.pbm_write_flag == "0") {
            m("pbm_write_flag", dh);
            di({
                result: "success"
            })
        } else {
            if (dg.pbm_write_flag == "6" || dg.pbm_write_flag == "7" || dg.pbm_write_flag == "8" || dg.pbm_write_flag == "9" || dg.pbm_write_flag == "10" || dg.pbm_write_flag == "11" || dg.pbm_write_flag == "14") {
                m("pbm_write_flag", dh);
                di({
                    result: "fail"
                })
            } else {}
        }
    }

    function bn() {
        var dj = arguments[1];
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk, dl) {
            var dm = {};
            dm.notCallback = true;
            dm.goformId = "PBM_CONTACT_DEL";
            dm.del_option = "delete_num";
            dm.delete_id = dk.indexs.join(",");
            return dm
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                bd("pbm_write_flag", dg)
            } else {
                dj(dk)
            }
        }

        function dg(dk) {
            a2(dk, dj, dg)
        }
    }

    function aX() {
        var dj = arguments[1];
        return bB(arguments, {}, dg, di, null, true);

        function dg(dk, dl) {
            var dm = {};
            dm.notCallback = true;
            dm.goformId = "PBM_CONTACT_DEL";
            dm.del_option = "delete_all";
            dm.del_all_location = dk.location;
            return dm
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                bd("pbm_write_flag", dh)
            } else {
                dj(dk)
            }
        }

        function dh(dk) {
            a2(dk, dj, dh)
        }
    }

    function ab() {
        var dj = arguments[1];
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk, dl) {
            var dm = {};
            dm.notCallback = true;
            dm.goformId = "PBM_CONTACT_DEL";
            dm.del_option = "delete_all_by_group";
            dm.del_all_location = 3;
            dm.del_group = dk.group;
            return dm
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                bd("pbm_write_flag", dg)
            } else {
                dj(dk)
            }
        }

        function dg(dk) {
            a2(dk, dj, dg)
        }
    }

    function ah() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_CONNECTION_MODE";
            dk.ConnectionMode = di.connectionMode;
            dk.roam_setting_option = di.isAllowedRoaming;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                callback(di)
            }
        }
    }

    function b5() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_SIM_SELECT";
            dk.sim_select = di.sim_select;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                callback(di)
            }
        }
    }

    function N() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_SIM_SELECT_WITH_PWD";
            dk.sim_select = di.sim_select;
            dk.admin_pwd = di.admin_pwd;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                callback(di)
            }
        }
    }

    function K() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "ConnectionMode";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.connectionMode = dj.connectionMode;
                di.isAllowedRoaming = dj.autoConnectWhenRoaming;
                return di
            } else {
                return X
            }
        }
    }

    function M() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_OLAX_SET_SPEED_LIMIT";
            dk.olax_speed_limit = di.selectedspeed_limitTypes;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                callback(di)
            }
        }
    }

    function cr() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "alk_olax_config";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.alk_olax_config = dj.alk_olax_config;
                return di
            } else {
                return X
            }
        }
    }

    function c8() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "alk_sim_select";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.alk_sim_select = dj.alk_sim_select;
                return di
            } else {
                return X
            }
        }
    }

    function a(dj, dg) {
        if (dj[0].data_per_page == 0) {
            return {
                pbm_data: []
            }
        }
        return bB(dj, {}, dh, di, null, false);

        function dh(dk, dl) {
            var dm = {};
            dm.mem_store = dg;
            if (dg == 2) {
                dm.cmd = "pbm_data_total"
            } else {
                dm.cmd = "pbm_data_info"
            }
            dm.page = dk.page;
            dm.data_per_page = dk.data_per_page;
            dm.orderBy = dk.orderBy;
            dm.isAsc = dk.isAsc;
            return dm
        }

        function di(dk) {
            if (dk && dk.pbm_data) {
                var dl = [];
                cT.each(dk.pbm_data, function(dm) {
                    dl.push({
                        pbm_id: dk.pbm_data[dm].pbm_id,
                        pbm_location: dk.pbm_data[dm].pbm_location,
                        pbm_number: dk.pbm_data[dm].pbm_number,
                        pbm_anr: dk.pbm_data[dm].pbm_anr,
                        pbm_anr1: dk.pbm_data[dm].pbm_anr1,
                        pbm_group: dk.pbm_data[dm].pbm_group,
                        pbm_name: decodeMessage(dk.pbm_data[dm].pbm_name),
                        pbm_email: decodeMessage(dk.pbm_data[dm].pbm_email)
                    })
                });
                return {
                    pbm_data: dl
                }
            } else {
                return X
            }
        }
    }

    function bX() {
        if (arguments[0].data_per_page == 0) {
            return {
                pbm_data: []
            }
        }
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "pbm_data_total";
            dk.mem_store = 3;
            dk.pbm_group = di.group;
            dk.page = di.page;
            dk.data_per_page = di.data_per_page;
            dk.orderBy = di.orderBy;
            dk.isAsc = di.isAsc;
            return dk
        }

        function dh(di) {
            if (di && di.pbm_data) {
                var dj = [];
                cT.each(di.pbm_data, function(dk) {
                    dj.push({
                        pbm_id: di.pbm_data[dk].pbm_id,
                        pbm_location: di.pbm_data[dk].pbm_location,
                        pbm_number: di.pbm_data[dk].pbm_number,
                        pbm_anr: di.pbm_data[dk].pbm_anr,
                        pbm_anr1: di.pbm_data[dk].pbm_anr1,
                        pbm_group: di.pbm_data[dk].pbm_group,
                        pbm_name: decodeMessage(di.pbm_data[dk].pbm_name),
                        pbm_email: decodeMessage(di.pbm_data[dk].pbm_email)
                    })
                });
                return {
                    pbm_data: dj
                }
            } else {
                return X
            }
        }
    }

    function da() {
        return a(arguments, 1)
    }

    function cM() {
        return a(arguments, 0)
    }

    function U() {
        return a(arguments, 2)
    }

    function ck() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "pbm_init_flag";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function ch(dj, di) {
        return bB(dj, {}, dg, dh, null, false);

        function dg(dk, dl) {
            var dm = {};
            dm.cmd = "pbm_capacity_info";
            if (di) {
                dm.pbm_location = "pbm_sim"
            } else {
                dm.pbm_location = "pbm_native"
            }
            return dm
        }

        function dh(dk) {
            if (dk) {
                return dk
            } else {
                return X
            }
        }
    }

    function bS() {
        var dg = ch(arguments, true);
        return {
            simPbmTotalCapacity: parseInt(dg.pbm_sim_max_record_num),
            simPbmUsedCapacity: parseInt(dg.pbm_sim_used_record_num),
            simType: dg.pbm_sim_type,
            maxNameLen: parseInt(dg.pbm_sim_max_name_len),
            maxNumberLen: parseInt(dg.pbm_sim_max_number_len) > 40 ? 40 : parseInt(dg.pbm_sim_max_number_len)
        }
    }

    function ai() {
        var dg = ch(arguments, false);
        return {
            pcPbmTotalCapacity: parseInt(dg.pbm_dev_max_record_num),
            pcPbmUsedCapacity: parseInt(dg.pbm_dev_used_record_num)
        }
    }

    function bH() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "lan_station_list"
            };
            return dk
        }

        function dh(di) {
            var dl = [];
            var dm = di.lan_station_list || di.station_list;
            for (var dk = 0; dm && dk < dm.length; dk++) {
                var dn = {};
                dn.macAddress = dm[dk].mac_addr;
                var dj = dm[dk].hostname;
                dn.hostName = dj == "" ? cT.i18n.prop("unknown") : dj;
                dn.ipAddress = dm[dk].ip_addr;
                dl.push(dn)
            }
            return {
                attachedDevices: dl
            }
        }
    }

    function bs() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "station_list"
            };
            return dk
        }

        function dh(di) {
            var dl = [];
            var dm = di.station_list;
            for (var dk = 0; dm && dk < dm.length; dk++) {
                var dn = {};
                dn.macAddress = dm[dk].mac_addr;
                var dj = dm[dk].hostname;
                dn.hostName = dj == "" ? cT.i18n.prop("unknown") : dj;
                dn.ipAddress = dm[dk].ip_addr;
                dl.push(dn)
            }
            return {
                attachedDevices: dl
            }
        }
    }

    function k() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_WEB_LANGUAGE";
            dk.Language = di.Language;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function A() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "Language";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.Language = (dj && dj.Language) ? dj.Language : "en";
                return di
            } else {
                return X
            }
        }
    }

    function bL() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_BEARER_PREFERENCE";
            dk.BearerPreference = di.strBearerPreference;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aH(di) {
        cT.post("/reqproc/proc_post", {
            goformId: "SCAN_NETWORK"
        }, function(dj) {
            if (dj.result == "success") {
                dg()
            } else {
                di(false, [])
            }
        }, "json").error(function() {
            di(false, [])
        });

        function dg() {
            cT.getJSON("/reqproc/proc_get", {
                cmd: "m_netselect_status",
                _: new Date().getTime()
            }, function(dj) {
                if (dj.m_netselect_status == "manual_selecting") {
                    setTimeout(dg, 1000)
                } else {
                    cT.getJSON("/reqproc/proc_get", {
                        cmd: "m_netselect_contents",
                        _: new Date().getTime()
                    }, function(dk) {
                        if (trim(dk.m_netselect_contents) != "") {
                            dh(dk.m_netselect_contents)
                        } else {
                            di(false, [])
                        }
                    }).error(function() {
                        di(false, [])
                    })
                }
            }).error(function() {
                di(false, [])
            })
        }

        function dh(dj) {
            var dn = /([^,;]*),([^,]*),([^,]*),([^,]*),([^,;]*)/g;
            var dp = [];
            var dq;
            var dm = dj.split(";");
            var dk = "";
            for (i = 0; i < dm.length; i++) {
                var dl = dm[i].split(",").length;
                if (dl == 4) {
                    dk += dm[i] + ",NON;"
                } else {
                    dk += dm[i] + ";"
                }
            }
            while (dq = dn.exec(dk)) {
                if (dq != null) {
                    dp.push({
                        strShortName: dq[2].replace(/\"/g, ""),
                        strNumeric: dq[3].replace(/\D/g, ""),
                        nRat: parseInt(dq[4], 10),
                        nState: parseInt(dq[1], 10),
                        SubAct: parseInt(dq[5], 10)
                    })
                }
            }
            di(true, dp)
        }
    }

    function S() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.current_network_mode = dj.current_network_mode;
                di.net_select_mode = dj.net_select_mode;
                di.m_netselect_save = dj.m_netselect_save;
                di.m_netselect_contents = dj.m_netselect_contents;
                di.net_select = dj.net_select;
                di.ppp_status = dj.ppp_status;
                di.modem_main_state = dj.modem_main_state;
                return di
            } else {
                return X
            }
        }
    }

    function aN() {
        return bB(arguments, {}, dg, dh, {}, false);

        function dg(di, dj) {
            var dk = {
                cmd: "sms_data_total",
                page: di.page,
                data_per_page: aJ.SMS_DATABASE_SORT_SUPPORT ? di.smsCount : 500,
                mem_store: di.nMessageStoreType,
                tags: di.tags,
                order_by: di.orderBy
            };
            return dk
        }

        function dh(di) {
            if (di && di.messages && di.messages.length > 0) {
                return {
                    messages: cP(di.messages)
                }
            } else {
                return {
                    messages: []
                }
            }
        }
    }

    function cP(di, dn) {
        var dp = [];
        for (var dj = 0; dj < di.length; dj++) {
            if (!aJ.SHOW_UN_COMPLETE_CONCAT_SMS && typeof di[dj].received_all_concat_sms != "undefined" && di[dj].received_all_concat_sms == "0") {
                continue
            }
            var dl = {};
            dl.id = di[dj].id;
            dl.number = di[dj].number;
            dl.content = dn ? di[dj].content : aZ(di[dj].content);
            dl.time = transTime("20" + di[dj].date);
            dl.isNew = di[dj].tag == "1";
            dl.groupId = di[dj].draft_group_id;
            dl.tag = di[dj].tag;
            dl.receivedAll = di[dj].received_all_concat_sms == "1";
            dp.push(dl)
        }
        if (!aJ.SMS_DATABASE_SORT_SUPPORT) {
            var dg = [];
            var dk = [];
            for (var dj = dp.length; dj--;) {
                var dh = dp[dj];
                var dm = cT.inArray(dh.id, dg);
                if (dm == -1) {
                    dg.push(dh.id);
                    dk.push(dh)
                } else {
                    if (dh.content.length > dk[dm].content.length) {
                        dk[dm] = dh
                    }
                }
            }
            return cj.sortBy(dk, function(dq) {
                return 0 - dq.id
            })
        } else {
            return dp
        }
    }

    function aZ(dg) {
        return decodeMessage(escapeMessage(dg))
    }

    function a1() {
        var dj = arguments[1];
        var dh = arguments[2] ? arguments[2] : dj;
        return bB(arguments, {}, dg, di, null, true);

        function dg(dk, dl) {
            var dm = {
                goformId: "SEND_SMS",
                notCallback: true,
                Number: dk.number,
                sms_time: getCurrentTimeString(),
                MessageBody: escapeMessage(encodeMessage(dk.message)),
                ID: dk.id,
                encode_type: getEncodeType(dk.message).encodeType
            };
            return dm
        }

        function di(dk) {
            if (!dk) {
                dh(cT.extend(X, {
                    errorType: "sendFail",
                    errorText: "send_fail_try_again"
                }));
                return
            }
            if (dk.result == "success") {
                setTimeout(function() {
                    cQ({
                        smsCmd: 4,
                        errorType: "sendFail",
                        errorText: "send_fail_try_again"
                    }, dj, dh)
                }, 1000)
            } else {
                dh(cT.extend(X, {
                    errorType: "sendFail",
                    errorText: "send_fail_try_again"
                }))
            }
        }
    }

    function aK() {
        var dj = arguments[1];
        var dh = arguments[2] ? arguments[2] : dj;
        return bB(arguments, {}, dg, di, null, true);

        function dg(dk, dl) {
            var dm = {
                notCallback: true,
                goformId: "SAVE_SMS",
                SMSMessage: escapeMessage(encodeMessage(dk.message)),
                SMSNumber: dk.numbers.join(";") + ";",
                Index: dk.index,
                encode_type: getEncodeType(dk.message).encodeType,
                sms_time: dk.currentTimeString,
                draft_group_id: dk.groupId
            };
            return dm
        }

        function di(dk) {
            if (!dk) {
                dh(cT.extend(X, {
                    errorType: "saveFail",
                    errorText: "save_fail"
                }));
                return
            }
            if (dk.result == "success") {
                cQ({
                    smsCmd: 5,
                    errorType: "saveFail",
                    errorText: "save_fail"
                }, dj, dh)
            } else {
                dh(cT.extend(X, {
                    errorType: "saveFail",
                    errorText: "save_fail"
                }))
            }
        }
    }

    function bW() {
        var dk = arguments[1];
        var di = arguments[2] ? arguments[2] : dk;
        return bB(arguments, {}, dh, dj, null, true);

        function dh(dl, dm) {
            var dn = {
                goformId: "ALL_DELETE_SMS",
                notCallback: true,
                which_cgi: dl.location
            };
            return dn
        }

        function dj(dl) {
            if (!dl) {
                di(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }));
                return
            }
            if (dl.result == "success") {
                bd("sms_cmd_status_info", dg)
            } else {
                di(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }

        function dg(dm) {
            var dl = dm.sms_cmd_status_info;
            if (dl == "2") {
                m("sms_cmd_status_info", dg);
                di(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            } else {
                if (dl == "3") {
                    m("sms_cmd_status_info", dg);
                    dk({
                        result: true
                    })
                }
            }
        }
    }

    function cE() {
        var dj = arguments[1];
        var dh = arguments[2] ? arguments[2] : dj;
        return bB(arguments, {}, dg, di, null, true);

        function dg(dl, dm) {
            var dk = dl.ids.join(";") + ";";
            var dn = {
                goformId: "DELETE_SMS",
                msg_id: dk,
                notCallback: true
            };
            return dn
        }

        function di(dk) {
            if (!dk) {
                dh(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }));
                return
            }
            if (dk.result == "success") {
                cQ({
                    smsCmd: 6,
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }, dj, dh)
            } else {
                dh(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }
    }

    function cQ(dh, di, dg) {
        dc({
            cmd: "sms_cmd_status_info",
            sms_cmd: dh.smsCmd
        }, function(dk) {
            if (dk) {
                var dj = dk.sms_cmd_status_result;
                if (dj == "2") {
                    dg(cT.extend(X, {
                        errorType: dh.errorType,
                        errorText: dh.errorText
                    }))
                } else {
                    if (dj == "3") {
                        di({
                            result: "success"
                        })
                    } else {
                        window.setTimeout(function() {
                            cQ(dh, di, dg)
                        }, 1000)
                    }
                }
            } else {
                dg(cT.extend(X, {
                    errorType: dh.errorType,
                    errorText: dh.errorText
                }))
            }
        }, function(dj) {
            dg(cT.extend(X, {
                errorType: dh.errorType,
                errorText: dh.errorText
            }))
        }, false)
    }

    function aL() {
        if (aJ.smsIsReady) {
            var di = arguments[1];
            if (di) {
                return di({
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
            return bB(arguments, {}, dg, dh, null, false)
        }

        function dg(dj, dk) {
            var dl = {};
            dl.cmd = "sms_cmd_status_info";
            dl.sms_cmd = 1;
            return dl
        }

        function dh(dj) {
            if (dj) {
                if (dj.sms_cmd_status_result == "3") {
                    aJ.smsIsReady = true
                }
                return dj
            } else {
                return X
            }
        }
    }

    function ag() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dj, dk) {
            var di = dj.ids.join(";");
            if (dj.ids.length > 0) {
                di += ";"
            }
            var dl = {
                goformId: "SET_MSG_READ",
                msg_id: di,
                tag: 0
            };
            return dl
        }

        function dh(di) {
            if (di.result == "success") {
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
        return bB(arguments, {}, dg, dh, {}, false);

        function dg(di, dj) {
            var dk = {
                cmd: "sms_status_rpt_data",
                page: di.page,
                data_per_page: di.smsCount
            };
            return dk
        }

        function dh(di) {
            if (di) {
                return {
                    messages: cP(di.messages, true)
                }
            } else {
                return X
            }
        }
    }

    function bv() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = cT.extend({}, di);
            dk.goformId = "LOGOUT";
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                bw.isLoggedIn = false;
                return {
                    result: true
                }
            } else {
                return cT.extend(X, {
                    errorType: "loggedOutError"
                })
            }
        }
    }

    function bZ() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.newPassword = aJ.PASSWORD_ENCODE ? Base64.encode(di.newValue) : di.newValue;
            dk.oldPassword = aJ.PASSWORD_ENCODE ? Base64.encode(di.oldValue) : di.oldValue;
            dk.goformId = "CHANGE_PASSWORD";
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
                return {
                    result: true
                }
            } else {
                return cT.extend(X, {
                    errorType: "badPassword"
                })
            }
        }
    }

    function cJ() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "imei,time_to_live";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.imei = dj.imei;
                di.time_to_live = dj.time_to_live;
                return di
            } else {
                return X
            }
        }
    }

    function bF() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_WRITE_IMEI";
            dk.imei_string = di.imei_string;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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

    function bt() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_WRITE_TTL";
            dk.ttl_value = di.ttl_value;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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

    function ax() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "midnight_reboot_switch";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function c4() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "midnight_reboot_hour";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cX() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "network_detect_switch";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cc() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_NETDET_SWITCH";
            dk.network_detect_switch = di.network_detect_switch;
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cu() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_REBOOT_SWITCH";
            dk.midnight_reboot_switch = di.midnight_reboot_switch;
            dk.midnight_reboot_hour = di.midnight_reboot_hour;
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function c3() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "pinnumber,pin_status,puknumber";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function df() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ENABLE_PIN";
            dk.OldPinNumber = di.oldPin;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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

    function b2() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "DISABLE_PIN";
            dk.OldPinNumber = di.oldPin;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ENABLE_PIN";
            dk.OldPinNumber = di.oldPin;
            dk.NewPinNumber = di.newPin;
            return dk
        }

        function dh(di) {
            if (di && di.result === "success") {
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

    function bu() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour,lan_dns_mode,lan_dns_ip";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.ipAddress = dj.lan_ipaddr;
                di.subnetMask = dj.lan_netmask;
                di.macAddress = dj.mac_address;
                di.dhcpServer = dj.dhcpEnabled;
                di.dhcpStart = dj.dhcpStart;
                di.dhcpEnd = dj.dhcpEnd;
                di.dhcpLease = parseInt(dj.dhcpLease_hour, 10);
                di.lan_dns_mode = dj.lan_dns_mode;
                di.lan_dns_ip = dj.lan_dns_ip;
                return di
            } else {
                return X
            }
        }
    }

    function cg() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "DHCP_SETTING";
            dk.lanIp = di.ipAddress;
            dk.lanNetmask = di.subnetMask;
            dk.lanDhcpType = di.dhcpServer == "1" ? "SERVER" : "DISABLE";
            if (dk.lanDhcpType == "SERVER") {
                dk.dhcpStart = di.dhcpStart;
                dk.dhcpEnd = di.dhcpEnd;
                dk.dhcpLease = di.dhcpLease
            }
            dk.dhcp_reboot_flag = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function b3() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "sms_parameter_info";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.centerNumber = dj.sms_para_sca;
                di.memStroe = dj.sms_para_mem_store;
                di.deliveryReport = dj.sms_para_status_report;
                switch (parseInt(dj.sms_para_validity_period, 10)) {
                    case 143:
                        di.validity = "twelve_hours";
                        break;
                    case 167:
                        di.validity = "one_day";
                        break;
                    case 173:
                        di.validity = "one_week";
                        break;
                    case 244:
                        di.validity = "largest";
                        break;
                    case 255:
                        di.validity = "largest";
                        break;
                    default:
                        di.validity = "twelve_hours";
                        break
                }
                return di
            } else {
                return X
            }
        }
    }

    function aS() {
        var dj = arguments[1];
        var dh = arguments[2] ? arguments[2] : dj;
        return bB(arguments, {}, dg, di, null, true);

        function dg(dk, dl) {
            var dm = {};
            dm.goformId = "SET_MESSAGE_CENTER";
            dm.save_time = dk.validity;
            dm.MessageCenter = dk.centerNumber;
            dm.status_save = dk.deliveryReport;
            dm.save_location = "native";
            dm.notCallback = true;
            return dm
        }

        function di(dk) {
            if (!dk) {
                dh(cT.extend(X, {
                    errorType: "smsSettingFail",
                    errorText: "error_info"
                }));
                return
            }
            if (dk.result == "success") {
                cQ({
                    smsCmd: 3,
                    errorType: "smsSettingFail",
                    errorText: "error_info"
                }, dj, dh)
            } else {
                dh(cT.extend(X, {
                    errorType: "deleteFail",
                    errorText: "delete_fail_try_again"
                }))
            }
        }
    }

    function aA() {
        var dh = {};
        if (aJ.HAS_PARENTAL_CONTROL && aJ.currentUserInChildGroup != false) {
            dh = {
                errorType: "no_auth"
            }
        }
        return bB(arguments, dh, dg, di, null, true);

        function dg(dj, dk) {
            var dl = {};
            dl.goformId = "RESTORE_FACTORY_SETTINGS";
            return dl
        }

        function di(dj) {
            if (dj) {
                return dj
            } else {
                return X
            }
        }
    }

    function ad(dg) {
        var dh = {};
        dh.cmd = "restore_flag";
        dh.multi_data = 1;
        dc(dh, function(di) {
            if (di && di.restore_flag === "1") {
                dg()
            } else {
                setTimeout(function() {
                    ad(dg)
                }, 5000)
            }
        }, function() {
            setTimeout(function() {
                ad(dg)
            }, 5000)
        }, false)
    }

    function cf() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            if (aJ.WIFI_HAS_5G) {
                dk.cmd = "wifi_wps_index,WscModeOption,AuthMode,wifi_cur_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode,wifi_sta_connection,AuthMode_5g,EncrypType_5g,SSID1_5g,m_SSID_5g,m_EncrypType_5g,m_AuthMode_5g,wifi_band"
            } else {
                dk.cmd = "wifi_wps_index,WscModeOption,AuthMode,wifi_cur_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode,wifi_sta_connection"
            }
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.wpsFlag = dj.WscModeOption;
                di.authMode = dj.AuthMode;
                di.wpsType = dj.wps_mode;
                di.radioFlag = dj.wifi_cur_state == "1" ? "1" : "0";
                di.encrypType = dj.EncrypType;
                di.wpsSSID = dj.WPS_SSID;
                di.ssidEnable = dj.m_ssid_enable;
                di.ssid = dj.SSID1;
                di.multiSSID = dj.m_SSID;
                di.m_encrypType = dj.m_EncrypType;
                di.wifi_wps_index = dj.wifi_wps_index;
                di.AuthMode = dj.AuthMode;
                di.m_AuthMode = dj.m_AuthMode;
                di.ap_station_enable = dj.wifi_sta_connection;
                if (aJ.WIFI_HAS_5G && dj.wifi_band == "a") {
                    di.AuthMode = dj.AuthMode_5g;
                    di.ssid = dj.SSID1_5g;
                    di.encrypType = dj.EncrypType_5g;
                    di.multiSSID = dj.m_SSID_5g;
                    di.m_AuthMode = dj.m_AuthMode_5g;
                    di.m_encrypType = dj.m_EncrypType_5g
                }
                return di
            } else {
                return X
            }
        }
    }

    function r() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "WIFI_WPS_SET";
            dk.WPS_SSID = di.wpsSSID;
            dk.wps_mode = di.wpsType;
            dk.wifi_wps_index = di.wpsIndex;
            if (dk.wps_mode == "PIN") {
                dk.wps_pin = di.wpsPin
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function ae() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "WIFI_M_WPS_SET";
            dk.m_WPS_SSID = di.wpsSSID;
            dk.m_wps_mode = di.wpsType;
            dk.m_wifi_wps_index = di.wpsIndex;
            if (dk.m_wps_mode == "PIN") {
                dk.m_wps_pin = di.wpsPin
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cn() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "Sleep_interval";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.sleepMode = dj.Sleep_interval;
                return di
            } else {
                return X
            }
        }
    }

    function bh() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_WIFI_SLEEP_INFO";
            dk.sysIdleTimeToSleep = di.sleepMode;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bY() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "RemoteManagement,WANPingFilter";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.remoteFlag = dj.RemoteManagement == "1" ? "1" : "0";
                di.pingFlag = dj.WANPingFilter == "1" ? "1" : "0";
                return di
            } else {
                return X
            }
        }
    }

    function cI() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "FW_SYS";
            dk.remoteManagementEnabled = di.remoteFlag;
            dk.pingFrmWANFilterEnabled = di.pingFlag;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function D() {
        return bB(arguments, {}, dg, di, null, false);

        function dg(dj, dk) {
            var dl = {};
            dl.cmd = "PortForwardEnable,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9";
            dl.multi_data = 1;
            return dl
        }

        function di(dk) {
            if (dk) {
                var dj = {};
                dj.portForwardEnable = dk.PortForwardEnable;
                var dl = [];
                if (dk.PortForwardRules_0 != "") {
                    dl.push([0, dk.PortForwardRules_0])
                }
                if (dk.PortForwardRules_1 != "") {
                    dl.push([1, dk.PortForwardRules_1])
                }
                if (dk.PortForwardRules_2 != "") {
                    dl.push([2, dk.PortForwardRules_2])
                }
                if (dk.PortForwardRules_3 != "") {
                    dl.push([3, dk.PortForwardRules_3])
                }
                if (dk.PortForwardRules_4 != "") {
                    dl.push([4, dk.PortForwardRules_4])
                }
                if (dk.PortForwardRules_5 != "") {
                    dl.push([5, dk.PortForwardRules_5])
                }
                if (dk.PortForwardRules_6 != "") {
                    dl.push([6, dk.PortForwardRules_6])
                }
                if (dk.PortForwardRules_7 != "") {
                    dl.push([7, dk.PortForwardRules_7])
                }
                if (dk.PortForwardRules_8 != "") {
                    dl.push([8, dk.PortForwardRules_8])
                }
                if (dk.PortForwardRules_9 != "") {
                    dl.push([9, dk.PortForwardRules_9])
                }
                dj.portForwardRules = dh(dl);
                return dj
            } else {
                return X
            }
        }

        function dh(dj) {
            var dn = [];
            if (dj && dj.length > 0) {
                for (var dl = 0; dl < dj.length; dl++) {
                    var dk = {};
                    var dm = dj[dl][1].split(",");
                    dk.index = dj[dl][0];
                    dk.ipAddress = dm[0];
                    dk.portRange = dm[1] + " - " + dm[2];
                    dk.protocol = transProtocol(dm[3]);
                    dk.comment = dm[4];
                    dn.push(dk)
                }
            }
            return dn
        }
    }

    function ar() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "FW_FORWARD_ADD";
            dk.ipAddress = di.ipAddress;
            dk.portStart = di.portStart;
            dk.portEnd = di.portEnd;
            dk.protocol = di.protocol;
            dk.comment = di.comment;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cH() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "FW_FORWARD_DEL";
            dk.delete_id = di.indexs.join(";") + ";";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aF() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "VIRTUAL_SERVER";
            dk.PortForwardEnable = di.portForwardEnable;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function c(dl, dk, dg) {
        var dj = dl + dk + "FFFFFFFFFFFFFFFFFFFFFFFF";
        var dn;
        var dm;
        dn = dj.substring(0, 24);
        dm = dj.substring(0, 16);
        var di = bx.enc.Latin1.parse(dn);
        var dh = bx.enc.Latin1.parse(dm);
        var dp = bx.AES.decrypt(dg, di, {
            iv: dh,
            mode: bx.mode.CBC,
            padding: bx.pad.ZeroPadding
        }).toString(bx.enc.Utf8);
        return dp
    }

    function a6() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dj, dk) {
            var dl = {};
            if (aJ.WIFI_HAS_5G) {
                var di = aJ.PASSWORD_ENCODE ? ",WPAPSK1_encode,WPAPSK1_encode_5g" : ",imei,rnum_js,WPAPSK1_enaes,WPAPSK1_enaes_5g";
                dl.cmd = "pdp_type,ipv6_pdp_type,wifi_cur_state,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode,EncrypType,DefaultKeyID,Key1Str1,Key2Str1,Key3Str1,Key4Str1" + di + ",APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19,SSID1_5g,HideSSID_5g,AuthMode_5g,EncrypType_5g,DefaultKeyID_5g,Key1Str1_5g,Key2Str1_5g,Key3Str1_5g,Key4Str1_5g,wifi_band"
            } else {
                var di = aJ.PASSWORD_ENCODE ? ",WPAPSK1_encode" : ",imei,rnum_js,WPAPSK1_enaes";
                dl.cmd = "pdp_type,ipv6_pdp_type,wifi_cur_state,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode,EncrypType,DefaultKeyID,Key1Str1,Key2Str1,Key3Str1,Key4Str1" + di + ",APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19"
            }
            dl.multi_data = 1;
            return dl
        }

        function dh(di) {
            if (di) {
                if (aJ.PASSWORD_ENCODE) {
                    di.WPAPSK1 = Base64.decode(di.WPAPSK1_encode)
                } else {
                    di.WPAPSK1 = c(di.rnum_js, di.imei, di.WPAPSK1_enaes)
                }
                if (aJ.WIFI_HAS_5G && di.wifi_band == "a") {
                    if (aJ.PASSWORD_ENCODE) {
                        di.WPAPSK1 = Base64.decode(di.WPAPSK1_encode_5g)
                    } else {
                        di.WPAPSK1 = c(di.rnum_js, di.imei, di.WPAPSK1_enaes_5g)
                    }
                    di.SSID1 = di.SSID1_5g;
                    di.HideSSID = di.HideSSID_5g;
                    di.AuthMode = di.AuthMode_5g;
                    di.EncrypType = di.EncrypType_5g;
                    di.DefaultKeyID = di.DefaultKeyID_5g;
                    di.Key1Str1 = di.Key1Str1_5g;
                    di.Key2Str1 = di.Key2Str1_5g;
                    di.Key3Str1 = di.Key3Str1_5g;
                    di.Key4Str1 = di.Key4Str1_5g
                }
                return di
            } else {
                return X
            }
        }
    }

    function db() {
        az(arguments, dg, dh);

        function dg(di) {
            var dj = {
                goformId: "QUICK_SETUP_EX",
                index: di.apn_index,
                pdp_type: di.pdp_type,
                apn_mode: di.apnMode,
                profile_name: di.profile_name,
                wan_apn: di.wan_apn,
                ppp_auth_mode: di.ppp_auth_mode,
                ppp_username: di.ppp_username,
                ppp_passtmp: di.ppp_passtmp,
                ipv6_wan_apn: di.ipv6_wan_apn,
                ipv6_ppp_auth_mode: di.ipv6_ppp_auth_mode,
                ipv6_ppp_username: di.ipv6_ppp_username,
                ipv6_ppp_passtmp: di.ipv6_ppp_passtmp,
                SSID_name: di.SSID_name,
                SSID_Broadcast: di.SSID_Broadcast,
                Encryption_Mode_hid: di.Encryption_Mode_hid,
                security_shared_mode: di.security_shared_mode,
                WPA_PreShared_Key: aJ.PASSWORD_ENCODE ? Base64.encode(di.WPA_PreShared_Key) : di.WPA_PreShared_Key,
                wep_default_key: di.wep_default_key,
                WPA_ENCRYPTION_hid: di.WPA_ENCRYPTION_hid
            };
            dj.wep_key_1 = di.wep_key_1;
            dj.wep_key_2 = di.wep_key_2;
            dj.wep_key_3 = di.wep_key_3;
            dj.wep_key_4 = di.wep_key_4;
            if (di.wep_default_key == "1") {
                dj.WEP2Select = di.WEP2Select
            } else {
                if (di.wep_default_key == "2") {
                    dj.WEP3Select = di.WEP3Select
                } else {
                    if (di.wep_default_key == "3") {
                        dj.WEP4Select = di.WEP4Select
                    } else {
                        dj.WEP1Select = di.WEP1Select
                    }
                }
            }
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return cT.extend(X, {
                    errorType: "SetSetUpError"
                })
            }
        }
    }

    function az(dq, dk, di) {
        var dp = false;
        var dg = false;
        var dm = dk(dq[0]);
        var dn = dq[1];
        var dh = function(dr) {
            dp = true;
            if (!dg && dn) {
                dn(di(dr))
            }
            dg = true
        };
        var dl = dq[2];
        var dj = function() {
            dp = true;
            if (dl) {
                dl()
            }
        };
        dc(dm, dh, dj, true);
        addTimeout(function() {
            if (dp == false) {
                var dr = addInterval(function() {
                    if (dp == false) {
                        A({}, function(ds) {
                            window.clearInterval(dr);
                            dh({
                                result: "success"
                            })
                        })
                    }
                }, 1000)
            }
        }, 5000)
    }

    function bU() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
                multi_data: 1
            };
            return dk
        }

        function dh(dj) {
            if (dj) {
                var dk;
                if ("mmc2" == dj.HTTP_SHARE_FILE || "/mmc2" == dj.HTTP_SHARE_FILE || "/mmc2/" == dj.HTTP_SHARE_FILE) {
                    dk = "1"
                } else {
                    dk = "0"
                }
                var di = {
                    sd_mode: dj.sdcard_mode_option == "1" ? "0" : "1",
                    sd_status: dj.sd_card_state,
                    share_status: dj.HTTP_SHARE_STATUS == "Enabled" ? "1" : "0",
                    share_auth: dj.HTTP_SHARE_WR_AUTH == "readOnly" ? "0" : "1",
                    file_to_share: dk,
                    share_file: dj.HTTP_SHARE_FILE
                };
                return di
            } else {
                return X
            }
        }
    }

    function cA() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "HTTPSHARE_MODE_SET",
                mode_set: di.mode == "0" ? "http_share_mode" : "usb_mode"
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return {
                    result: "success"
                }
            } else {
                if (di && di.result == "processing") {
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

    function O() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "GOFORM_HTTPSHARE_CHECK_FILE",
                path_SD_CARD: di.path
            };
            return dk
        }

        function dh(di) {
            if (di) {
                if (di.result == "no_sdcard") {
                    return {
                        status: "no_sdcard"
                    }
                } else {
                    if (di.result == "noexist") {
                        return {
                            status: "noexist"
                        }
                    } else {
                        if (di.result == "processing") {
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
                return X
            }
        }
    }

    function af() {
        return bB(arguments, {}, dg, di, null, true);

        function dg(dj, dk) {
            var dl = {
                goformId: "HTTPSHARE_ENTERFOLD",
                path_SD_CARD: dj.path,
                indexPage: dj.index
            };
            return dl
        }

        function di(dj) {
            if (dj) {
                if (dj.result == "failure") {
                    return cT.extend(X, {
                        errorType: "get_file_list_failure"
                    })
                } else {
                    if (dj.result == "no_sdcard") {
                        return cT.extend(X, {
                            errorType: "no_sdcard"
                        })
                    } else {
                        return dh(dj.result)
                    }
                }
            } else {
                return X
            }
        }

        function dh(dj) {
            var dm = {};
            dm.totalRecord = dj.totalRecord;
            var dp = [];
            var dl = dj.fileInfo;
            for (var dk = 0; dl && dk < dl.length; dk++) {
                if (dl[dk].fileName == "") {
                    continue
                }
                var dn = {};
                dn.fileName = dl[dk].fileName;
                dn.attribute = dl[dk].attribute;
                dn.size = dl[dk].size;
                dn.lastUpdateTime = dl[dk].lastUpdateTime;
                dp.push(dn)
            }
            dm.details = dp;
            return dm
        }
    }

    function bE() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dl = new Date();
            var dk = dl.getTime();
            var dm = dl.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_FILE_RENAME",
                path_SD_CARD: di.path,
                OLD_NAME_SD_CARD: di.oldPath,
                NEW_NAME_SD_CARD: di.newPath,
                path_SD_CARD_time: transUnixTime(dk),
                path_SD_CARD_time_unix: Math.round((dk - dm * 1000) / 1000)
            }
        }

        function dh(di) {
            if (di) {
                if (di.result == "success") {
                    return {
                        result: true
                    }
                } else {
                    if (di.result == "no_sdcard") {
                        return cT.extend(X, {
                            errorType: "no_sdcard"
                        })
                    } else {
                        if (di.result == "noexist") {
                            return cT.extend(X, {
                                errorType: "no_exist"
                            })
                        } else {
                            if (di.result == "processing") {
                                return cT.extend(X, {
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
                return X
            }
        }
    }

    function B() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "HTTPSHARE_GETCARD_VALUE"
            };
            return dk
        }

        function dh(di) {
            if (!di || (di.result && di.result == "no_sdcard")) {
                return cT.extend(X, {
                    errorType: "no_sdcard"
                })
            } else {
                return {
                    totalMemorySize: di.sd_card_total_size == "" ? 0 : di.sd_card_total_size * 32 * 1024,
                    availableMemorySize: di.sd_card_avi_space == "" ? 0 : di.sd_card_avi_space * 32 * 1024
                }
            }
        }
    }

    function aY() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = new Date().getTime();
            var dl = {
                goformId: "HTTPSHARE_DEL",
                path_SD_CARD: di.path,
                name_SD_CARD: di.names,
                path_SD_CARD_time: transUnixTime(dk),
                path_SD_CARD_time_unix: Math.round(dk / 1000)
            };
            return dl
        }

        function dh(di) {
            if (di.result && di.result == "failure") {
                return {
                    status: "failure"
                }
            } else {
                if (di.result && di.result == "no_sdcard") {
                    return {
                        status: "no_sdcard"
                    }
                } else {
                    if (di.result && di.result == "processing") {
                        return {
                            status: "processing"
                        }
                    } else {
                        if (di.result && di.result == "success") {
                            return {
                                status: "success"
                            }
                        } else {
                            return X
                        }
                    }
                }
            }
        }
    }

    function H() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dl = new Date();
            var dk = dl.getTime();
            var dm = dl.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_NEW",
                path_SD_CARD: di.path,
                path_SD_CARD_time: transUnixTime(dk),
                path_SD_CARD_time_unix: Math.round((dk - dm * 1000) / 1000)
            }
        }

        function dh(di) {
            if (di.result && di.result == "failure") {
                return cT.extend(X, {
                    errorType: "create_folder_failure"
                })
            } else {
                if (di.result && di.result == "no_sdcard") {
                    return cT.extend(X, {
                        errorType: "no_sdcard"
                    })
                } else {
                    if (di.result && di.result == "success") {
                        return {
                            result: true
                        }
                    } else {
                        return X
                    }
                }
            }
        }
    }

    function ce() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "HTTPSHARE_AUTH_SET",
                HTTP_SHARE_STATUS: di.share_status == "1" ? "Enabled" : "Disabled",
                HTTP_SHARE_WR_AUTH: di.share_auth == "1" ? "readWrite" : "readOnly",
                HTTP_SHARE_FILE: di.share_file
            };
            return dk
        }

        function dh(di) {
            if (di) {
                if (di.result == "no_sdcard") {
                    return cT.extend(X, {
                        errorType: "no_sdcard"
                    })
                } else {
                    return {
                        result: true
                    }
                }
            } else {
                return X
            }
        }
    }

    function bg() {
        return bB(arguments, {}, dh, di, null, false);

        function dh(dj, dk) {
            var dl = {};
            dl.cmd = "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9";
            dl.cmd += ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9";
            dl.multi_data = 1;
            return dl
        }

        function di(dk) {
            if (dk) {
                var dj = {};
                dj.portFilterEnable = dk.IPPortFilterEnable;
                dj.defaultPolicy = dk.DefaultFirewallPolicy;
                var dm = [];
                if (dk.IPPortFilterRules_0 != "") {
                    dm.push([0, dk.IPPortFilterRules_0])
                }
                if (dk.IPPortFilterRules_1 != "") {
                    dm.push([1, dk.IPPortFilterRules_1])
                }
                if (dk.IPPortFilterRules_2 != "") {
                    dm.push([2, dk.IPPortFilterRules_2])
                }
                if (dk.IPPortFilterRules_3 != "") {
                    dm.push([3, dk.IPPortFilterRules_3])
                }
                if (dk.IPPortFilterRules_4 != "") {
                    dm.push([4, dk.IPPortFilterRules_4])
                }
                if (dk.IPPortFilterRules_5 != "") {
                    dm.push([5, dk.IPPortFilterRules_5])
                }
                if (dk.IPPortFilterRules_6 != "") {
                    dm.push([6, dk.IPPortFilterRules_6])
                }
                if (dk.IPPortFilterRules_7 != "") {
                    dm.push([7, dk.IPPortFilterRules_7])
                }
                if (dk.IPPortFilterRules_8 != "") {
                    dm.push([8, dk.IPPortFilterRules_8])
                }
                if (dk.IPPortFilterRules_9 != "") {
                    dm.push([9, dk.IPPortFilterRules_9])
                }
                dj.portFilterRules = dg(dm, "IPv4");
                var dl = [];
                if (dk.IPPortFilterRulesv6_0 != "") {
                    dl.push([10, dk.IPPortFilterRulesv6_0])
                }
                if (dk.IPPortFilterRulesv6_1 != "") {
                    dl.push([11, dk.IPPortFilterRulesv6_1])
                }
                if (dk.IPPortFilterRulesv6_2 != "") {
                    dl.push([12, dk.IPPortFilterRulesv6_2])
                }
                if (dk.IPPortFilterRulesv6_3 != "") {
                    dl.push([13, dk.IPPortFilterRulesv6_3])
                }
                if (dk.IPPortFilterRulesv6_4 != "") {
                    dl.push([14, dk.IPPortFilterRulesv6_4])
                }
                if (dk.IPPortFilterRulesv6_5 != "") {
                    dl.push([15, dk.IPPortFilterRulesv6_5])
                }
                if (dk.IPPortFilterRulesv6_6 != "") {
                    dl.push([16, dk.IPPortFilterRulesv6_6])
                }
                if (dk.IPPortFilterRulesv6_7 != "") {
                    dl.push([17, dk.IPPortFilterRulesv6_7])
                }
                if (dk.IPPortFilterRulesv6_8 != "") {
                    dl.push([18, dk.IPPortFilterRulesv6_8])
                }
                if (dk.IPPortFilterRulesv6_9 != "") {
                    dl.push([19, dk.IPPortFilterRulesv6_9])
                }
                dj.portFilterRules = cj.union(dj.portFilterRules, dg(dl, "IPv6"));
                return dj
            } else {
                return X
            }
        }

        function dg(dj, dp) {
            var dn = [];
            if (dj && dj.length > 0) {
                for (var dl = 0; dl < dj.length; dl++) {
                    var dk = {};
                    var dm = dj[dl][1].split(",");
                    dk.index = dj[dl][0];
                    dk.macAddress = dm[11];
                    dk.destIpAddress = dm[4] == "any/0" ? "" : dm[4];
                    dk.sourceIpAddress = dm[0] == "any/0" ? "" : dm[0];
                    dk.destPortRange = dm[6] == "0" ? "" : dm[6] + " - " + dm[7];
                    dk.sourcePortRange = dm[2] == "0" ? "" : dm[2] + " - " + dm[3];
                    dk.action = dm[9] == 1 ? "filter_accept" : "filter_drop";
                    dk.protocol = transProtocol(dm[8]);
                    dk.comment = dm[10];
                    dk.ipType = dp;
                    dn.push(dk)
                }
            }
            return dn
        }
    }

    function ak() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "BASIC_SETTING";
            dk.portFilterEnabled = di.portFilterEnable;
            dk.defaultFirewallPolicy = di.defaultPolicy;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function W() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ADD_IP_PORT_FILETER_V4V6";
            dk.ip_version = di.ipType;
            dk.mac_address = di.macAddress;
            dk.dip_address = di.destIpAddress;
            dk.sip_address = di.sourceIpAddress;
            dk.dFromPort = di.destPortStart;
            dk.dToPort = di.destPortEnd;
            dk.sFromPort = di.sourcePortStart;
            dk.sToPort = di.sourcePortEnd;
            dk.action = di.action;
            dk.protocol = di.protocol;
            dk.comment = di.comment;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aD() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dj, dk) {
            var dl = {};
            var dm = cj.filter(dj.indexs, function(dn) {
                return dn.length == 1
            });
            dl.goformId = "DEL_IP_PORT_FILETER_V4V6";
            var di = [];
            cj.each(dj.indexs, function(dn) {
                if (dn.length == 2) {
                    di.push(dn.substring(1))
                }
            });
            dl.delete_id_v6 = di.length > 0 ? di.join(";") + ";" : "";
            dl.delete_id = dm.length > 0 ? dm.join(";") + ";" : "";
            return dl
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function ct() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "WirelessMode,WirelessMode_5g,CountryCode,Channel,Channel_5g,HT_MCS,wifi_band,wifi_11n_cap,wifi_11n_cap_5g,MAX_Access_num,m_MAX_Access_num,MAX_Station_num,wifi_sta_connection";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {
                    mode: dj.wifi_band == "a" ? dj.WirelessMode_5g : dj.WirelessMode,
                    countryCode: dj.CountryCode,
                    channel: dj.wifi_band == "a" ? dj.Channel_5g : dj.Channel,
                    rate: dj.HT_MCS,
                    wifiBand: dj.wifi_band == "a" ? "a" : "b",
                    bandwidth: dj.wifi_band == "a" ? dj.wifi_11n_cap_5g : dj.wifi_11n_cap,
                    MAX_Station_num: cT.isNumeric(dj.MAX_Station_num) ? dj.MAX_Station_num : aJ.MAX_STATION_NUMBER,
                    MAX_Access_num: dj.MAX_Access_num,
                    m_MAX_Access_num: dj.m_MAX_Access_num,
                    ap_station_enable: dj.wifi_sta_connection
                };
                return di
            } else {
                return X
            }
        }
    }

    function c5() {
        az(arguments, dg, dh);

        function dg(di) {
            var dj = {
                goformId: "SET_WIFI_INFO",
                wifiMode: di.mode,
                countryCode: di.countryCode,
                MAX_Access_num: di.station,
                m_MAX_Access_num: di.m_station
            };
            if (aJ.WIFI_BAND_SUPPORT) {
                dj.wifi_band = di.wifiBand
            }
            dj.selectedChannel = di.channel;
            if (!aJ.WIFI_BAND_SUPPORT) {
                dj.abg_rate = di.rate
            }
            if (aJ.WIFI_BANDWIDTH_SUPPORT) {
                dj.wifi_11n_cap = di.bandwidth
            }
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bb() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dj, dk) {
            var dl;
            if (aJ.WIFI_HAS_5G) {
                var di = aJ.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode,WPAPSK1_encode_5g,m_WPAPSK1_encode_5g," : "rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,WPAPSK1_enaes_5g,m_WPAPSK1_enaes_5g,";
                dl = {
                    cmd: "wifi_coverage,m_ssid_enable,imei,network_type,sub_network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,hw_version,MAX_Access_num," + di + "SSID1,AuthMode,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,pdp_type,ppp_status,sta_ip_status,rj45_state,ethwan_mode,MAX_Access_num_5g,SSID1_5g,AuthMode_5g,m_SSID_5g,m_AuthMode_5g,m_MAX_Access_num_5g,wifi_band,ziccid,lte_band,rssi,nv_sinr,nv_rsrq,nv_pci,cell_id,lte_sinr,lte_rsrp",
                    multi_data: 1
                }
            } else {
                var di = aJ.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
                dl = {
                    cmd: "wifi_coverage,m_ssid_enable,imei,network_type,sub_network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,hw_version,MAX_Access_num," + di + "SSID1,AuthMode,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,pdp_type,ppp_status,sta_ip_status,rj45_state,ethwan_mode,ziccid,lte_band,rssi,nv_sinr,nv_rsrq,nv_pci,cell_id,lte_sinr,lte_rsrp",
                    multi_data: 1
                }
            }
            return dl
        }

        function dh(di) {
            if (di) {
                if (aJ.WIFI_HAS_5G && di.wifi_band == "a") {
                    return {
                        ssid: di.SSID1_5g,
                        authMode: di.AuthMode_5g,
                        passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(di.WPAPSK1_encode_5g) : c(di.rnum_js, di.imei, di.WPAPSK1_enaes_5g),
                        m_ssid: di.m_SSID_5g,
                        m_AuthMode: di.m_AuthMode_5g,
                        m_passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(di.m_WPAPSK1_encode_5g) : c(di.rnum_js, di.imei, di.m_WPAPSK1_enaes_5g),
                        m_max_access_num: di.m_MAX_Access_num_5g,
                        multi_ssid_enable: di.m_ssid_enable,
                        ipAddress: di.lan_ipaddr,
                        wanIpAddress: di.wan_ipaddr,
                        staticWanIpAddress: di.static_wan_ipaddr,
                        ipv6WanIpAddress: di.ipv6_wan_ipaddr,
                        ipv6PdpType: di.ipv6_pdp_type,
                        macAddress: di.mac_address,
                        simSerialNumber: di.msisdn,
                        lanDomain: di.LocalDomain,
                        imei: di.imei,
                        iccid: di.ziccid,
                        signal: convertSignal(di),
                        imsi: di.imsi || di.sim_imsi,
                        sw_version: di.cr_version,
                        hw_version: di.hw_version,
                        max_access_num: di.MAX_Access_num_5g,
                        wifiRange: di.wifi_coverage,
                        pdpType: di.pdp_type,
                        rj45ConnectStatus: (typeof di.rj45_state == "undefined" || di.rj45_state == "") ? "dead" : di.rj45_state,
                        blc_wan_mode: bw.blc_wan_mode,
                        connectStatus: di.ppp_status,
                        wifiConStatus: di.sta_ip_status,
                        CellID: di.nv_globecellid,
                        pci: di.nv_pci,
                        nv_arfcn: di.nv_arfcn,
                        ethwan_mode: di.ethwan_mode.toUpperCase(),
                        rssi: di.rssi,
                        SINR: di.nv_sinr,
                        RSRP: di.rssi,
                        RSRQ: di.nv_rsrq,
                        lte_band: di.lte_band
                    }
                }
                return {
                    ssid: di.SSID1,
                    authMode: di.AuthMode,
                    passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(di.WPAPSK1_encode) : c(di.rnum_js, di.imei, di.WPAPSK1_enaes),
                    m_ssid: di.m_SSID,
                    m_AuthMode: di.m_AuthMode,
                    m_passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(di.m_WPAPSK1_encode) : c(di.rnum_js, di.imei, di.m_WPAPSK1_enaes),
                    m_max_access_num: di.m_MAX_Access_num,
                    multi_ssid_enable: di.m_ssid_enable,
                    ipAddress: di.lan_ipaddr,
                    wanIpAddress: di.wan_ipaddr,
                    staticWanIpAddress: di.static_wan_ipaddr,
                    ipv6WanIpAddress: di.ipv6_wan_ipaddr,
                    ipv6PdpType: di.ipv6_pdp_type,
                    macAddress: di.mac_address,
                    simSerialNumber: di.msisdn,
                    lanDomain: di.LocalDomain,
                    imei: di.imei,
                    iccid: di.ziccid,
                    signal: convertSignal(di),
                    imsi: di.imsi || di.sim_imsi,
                    sw_version: di.cr_version,
                    hw_version: di.hw_version,
                    max_access_num: di.MAX_Access_num,
                    wifiRange: di.wifi_coverage,
                    pdpType: di.pdp_type,
                    rj45ConnectStatus: (typeof di.rj45_state == "undefined" || di.rj45_state == "") ? "dead" : di.rj45_state,
                    blc_wan_mode: bw.blc_wan_mode,
                    connectStatus: di.ppp_status,
                    wifiConStatus: di.sta_ip_status,
                    CellID: di.cell_id,
                    pci: di.nv_pci,
                    lte_band: di.lte_band,
                    ethwan_mode: di.ethwan_mode.toUpperCase(),
                    rssi: di.rssi,
                    SINR: di.nv_sinr,
                    RSRP: di.rssi,
                    RSRQ: di.nv_rsrq
                }
            } else {
                return X
            }
        }
    }

    function c0() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "imei,rnum_js",
                multi_data: 1
            };
            return dk
        }

        function dh(di) {
            if (di) {
                var dl = di.rnum_js + di.imei + "FFFFFFFFFFFFFFFFFFFFFFFF";
                var dj;
                var dk;
                dj = dl.substring(0, 24);
                dk = dl.substring(0, 16);
                return {
                    skey: dj,
                    siv: dk
                }
            } else {
                return {
                    skey: "FFFFFFFFFFFFFFFFFFFFFFFF",
                    siv: "FFFFFFFFFFFFFFFF"
                }
            }
        }
    }

    function Y() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "wifi_coverage";
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.wifiRangeMode = dj.wifi_coverage;
                return di
            } else {
                return X
            }
        }
    }

    function c2() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_WIFI_COVERAGE";
            dk.wifi_coverage = di.wifiRangeMode;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function am() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "upnpEnabled";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.upnpSetting = dj.upnpEnabled == "1" ? "1" : "0";
                return di
            } else {
                return X
            }
        }
    }

    function a4() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "UPNP_SETTING";
            dk.upnp_setting_option = di.upnpSetting;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aC() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "DMZEnable,DMZIPAddress";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.dmzSetting = dj.DMZEnable == "1" ? "1" : "0";
                di.ipAddress = dj.DMZIPAddress;
                return di
            } else {
                return X
            }
        }
    }

    function cY() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "DMZ_SETTING";
            dk.DMZEnabled = di.dmzSetting;
            if (dk.DMZEnabled == "1") {
                dk.DMZIPAddress = di.ipAddress
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function ba() {
        return bB(arguments, {}, dh, di, null, false);

        function dh(dj, dk) {
            var dl = {};
            dl.cmd = "PortMapEnable,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9", dl.multi_data = 1;
            return dl
        }

        function di(dk) {
            if (dk) {
                var dj = {};
                dj.portMapEnable = dk.PortMapEnable;
                var dl = [];
                if (dk.PortMapRules_0 != "") {
                    dl.push([0, dk.PortMapRules_0])
                }
                if (dk.PortMapRules_1 != "") {
                    dl.push([1, dk.PortMapRules_1])
                }
                if (dk.PortMapRules_2 != "") {
                    dl.push([2, dk.PortMapRules_2])
                }
                if (dk.PortMapRules_3 != "") {
                    dl.push([3, dk.PortMapRules_3])
                }
                if (dk.PortMapRules_4 != "") {
                    dl.push([4, dk.PortMapRules_4])
                }
                if (dk.PortMapRules_5 != "") {
                    dl.push([5, dk.PortMapRules_5])
                }
                if (dk.PortMapRules_6 != "") {
                    dl.push([6, dk.PortMapRules_6])
                }
                if (dk.PortMapRules_7 != "") {
                    dl.push([7, dk.PortMapRules_7])
                }
                if (dk.PortMapRules_8 != "") {
                    dl.push([8, dk.PortMapRules_8])
                }
                if (dk.PortMapRules_9 != "") {
                    dl.push([9, dk.PortMapRules_9])
                }
                dj.portMapRules = dg(dl);
                return dj
            } else {
                return X
            }
        }

        function dg(dj) {
            var dn = [];
            if (dj && dj.length > 0) {
                for (var dl = 0; dl < dj.length; dl++) {
                    var dk = {};
                    var dm = dj[dl][1].split(",");
                    dk.index = dj[dl][0];
                    dk.sourcePort = dm[1];
                    dk.destIpAddress = dm[0];
                    dk.destPort = dm[2];
                    dk.protocol = transProtocol(dm[3]);
                    dk.comment = dm[4];
                    dn.push(dk)
                }
            }
            return dn
        }
    }

    function bJ() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ADD_PORT_MAP";
            dk.portMapEnabled = di.portMapEnable;
            dk.fromPort = di.sourcePort;
            dk.ip_address = di.destIpAddress;
            dk.toPort = di.destPort;
            dk.protocol = di.protocol;
            dk.comment = di.comment;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bG() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ADD_PORT_MAP";
            dk.portMapEnabled = di.portMapEnable;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function a0() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "DEL_PORT_MAP";
            dk.delete_id = di.indexs.join(";") + ";";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function I() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,traffic_alined_delta",
                multi_data: 1
            }
        }

        function dh(dj) {
            if (dj) {
                var dk = dj.data_volume_limit_unit == "data";
                var di = {
                    dataLimitChecked: dj.data_volume_limit_switch,
                    dataLimitTypeChecked: dk ? "1" : "0",
                    limitDataMonth: dk ? dj.data_volume_limit_size : "0",
                    alertDataReach: dk ? dj.data_volume_alert_percent : "0",
                    limitTimeMonth: dk ? "0" : dj.data_volume_limit_size,
                    alertTimeReach: dk ? "0" : dj.data_volume_alert_percent,
                    monthlySent: dj.monthly_tx_bytes == "" ? 0 : dj.monthly_tx_bytes,
                    monthlyReceived: dj.monthly_rx_bytes == "" ? 0 : dj.monthly_rx_bytes,
                    monthlyConnectedTime: dj.monthly_time == "" ? 0 : dj.monthly_time,
                    traffic_alined_delta: dj.traffic_alined_delta == "" ? 0 : dj.traffic_alined_delta
                };
                return di
            } else {
                return X
            }
        }
    }

    function ao() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dl = di.dataLimitTypeChecked == "1";
            var dk = {
                goformId: "DATA_LIMIT_SETTING",
                data_volume_limit_switch: di.dataLimitChecked
            };
            if (di.dataLimitChecked == "1") {
                dk.data_volume_limit_unit = dl ? "data" : "time";
                dk.data_volume_limit_size = dl ? di.limitDataMonth : di.limitTimeMonth;
                dk.data_volume_alert_percent = dl ? di.alertDataReach : di.alertTimeReach
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cD() {
        var di = arguments[1];
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dj, dk) {
            if (dj.sendOrReply == "send") {
                return {
                    goformId: "USSD_PROCESS",
                    USSD_operator: dj.operator,
                    USSD_send_number: dj.strUSSDCommand,
                    notCallback: true
                }
            } else {
                if (dj.sendOrReply == "reply") {
                    return {
                        goformId: "USSD_PROCESS",
                        USSD_operator: dj.operator,
                        USSD_reply_number: dj.strUSSDCommand,
                        notCallback: true
                    }
                }
            }
        }

        function dh(dj) {
            if (!dj) {
                di(false, "ussd_fail");
                return
            }
            if (dj.result == "success") {
                callbackTemp = di;
                cb()
            } else {
                di(false, "ussd_fail")
            }
        }
    }

    function cb() {
        cT.ajax({
            url: "/reqproc/proc_get",
            data: {
                cmd: "ussd_write_flag"
            },
            cache: false,
            async: true,
            dataType: "json",
            success: function(dg) {
                if (dg.ussd_write_flag == "1") {
                    callbackTemp(false, "ussd_no_service")
                } else {
                    if (dg.ussd_write_flag == "4" || dg.ussd_write_flag == "unknown" || dg.ussd_write_flag == "3") {
                        callbackTemp(false, "ussd_timeout")
                    } else {
                        if (dg.ussd_write_flag == "15") {
                            setTimeout(cb, 1000)
                        } else {
                            if (dg.ussd_write_flag == "10") {
                                callbackTemp(false, "ussd_retry")
                            } else {
                                if (dg.ussd_write_flag == "99") {
                                    callbackTemp(false, "ussd_unsupport")
                                } else {
                                    if (dg.ussd_write_flag == "41") {
                                        callbackTemp(false, "operation_not_supported")
                                    } else {
                                        if (dg.ussd_write_flag == "2") {
                                            callbackTemp(false, "network_terminated")
                                        } else {
                                            if (dg.ussd_write_flag == "16") {
                                                cT.ajax({
                                                    url: "/reqproc/proc_get",
                                                    data: {
                                                        cmd: "ussd_data_info"
                                                    },
                                                    dataType: "json",
                                                    async: true,
                                                    cache: false,
                                                    success: function(dh) {
                                                        var di = {};
                                                        di.data = dh.ussd_data;
                                                        di.ussd_action = dh.ussd_action;
                                                        di.ussd_dcs = dh.ussd_dcs;
                                                        callbackTemp(true, di)
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

    function p(dh) {
        cT.ajax({
            url: "/reqproc/proc_post",
            data: {
                goformId: "USSD_PROCESS",
                USSD_operator: "ussd_cancel"
            },
            cache: false,
            dataType: "json",
            success: function(di) {
                if (di.result == "success") {
                    dg()
                } else {
                    dh(false)
                }
            }
        });

        function dg() {
            cT.ajax({
                url: "/reqproc/proc_get",
                data: {
                    cmd: "ussd_write_flag"
                },
                cache: false,
                async: true,
                dataType: "json",
                success: function(di) {
                    if (di.ussd_write_flag == "15") {
                        setTimeout(dg, 1000)
                    } else {
                        if (di.ussd_write_flag == "13") {
                            dh(true)
                        } else {
                            dh(false)
                        }
                    }
                },
                error: function() {
                    dh(false)
                }
            })
        }
    }

    function aO() {
        var dk = arguments[1];
        var dj = 0;
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dl) {
            return {
                goformId: "UNLOCK_NETWORK",
                notCallback: true,
                unlock_network_code: dl.unlock_network_code
            }
        }

        function dh(dl) {
            if (dl && dl.result == "success") {
                cU(di)
            } else {
                dk({
                    result: "fail"
                })
            }
        }

        function di() {
            if (dj > 5) {
                C(di);
                dk({
                    result: "fail"
                })
            } else {
                if (bw.simStatus != "modem_imsi_waitnck") {
                    C(di);
                    dk({
                        result: "success"
                    })
                }
            }
            dj++
        }
    }

    function cl() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                cmd: "unlock_nck_time"
            }
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function c9() {
        var di = arguments[1];
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dj) {
            return {
                goformId: "SET_UPGRADE_NOTICE",
                upgrade_notice_flag: dj.upgrade_notice_flag,
                notCallback: true
            }
        }

        function dh(dj) {
            if (dj.result == "success") {
                di(true)
            } else {
                di(false)
            }
        }
    }

    function b4() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                cmd: "upgrade_notice_flag"
            }
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aw() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: 1,
                cmd: "wifi_sta_connection,pswan_priority,wifiwan_priority,ethwan_priority"
            }
        }

        function dh(di) {
            if (di) {
                return {
                    ap_station_enable: di.wifi_sta_connection,
                    ap_station_mode: parseInt(di.wifiwan_priority, 10) > parseInt(di.pswan_priority, 10) ? "wifi_pref" : "dial_pref"
                }
            } else {
                return X
            }
        }
    }

    function be() {
        var dh = arguments[0];
        return bB(arguments, {}, dg, di, null, true);

        function dg(dj) {
            return {
                goformId: "WIFI_STA_CONTROL",
                wifi_sta_connection: dj.ap_station_enable
            }
        }

        function di(dj) {
            if (dj && dj.result == "success") {
                bw.ap_station_enable = dh.ap_station_enable == 1;
                return dj
            } else {
                return X
            }
        }
    }

    function ac() {
        return aw({}, function(dg) {
            bw.ap_station_enable = dg.ap_station_enable == 1;
            bw.ap_station_mode = dg.ap_station_mode
        })
    }

    function co() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dk) {
            var dl = "wifi_profile_num,wifi_profile";
            for (var dj = 1; dj < aJ.AP_STATION_LIST_LENGTH; dj++) {
                dl = dl + ",wifi_profile" + dj
            }
            return {
                multi_data: 1,
                cmd: dl
            }
        }

        function dh(di) {
            if (di) {
                var dn = [];
                for (var dm = 0; dm < aJ.AP_STATION_LIST_LENGTH; dm++) {
                    var dq = "";
                    if (dm == 0) {
                        dq = di.wifi_profile
                    } else {
                        dq = di["wifi_profile" + dm]
                    }
                    var dl = dq.split(";");
                    for (var dk = 0; dk < dl.length; dk++) {
                        var dp = dl[dk].split(",");
                        if (!dp[0]) {
                            break
                        }
                        var dj = {
                            profileName: dp[0],
                            fromProvider: dp[1],
                            connectStatus: dp[2],
                            signal: dp[3],
                            ssid: dp[4],
                            authMode: dp[5],
                            encryptType: dp[6],
                            password: dp[7] == "0" ? "" : dp[7],
                            keyID: dp[8],
                            mac: dp[9]
                        };
                        dn.push(dj)
                    }
                }
                return {
                    hotspotList: dn
                }
            } else {
                return X
            }
        }
    }

    function ap() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di) {
            return {
                goformId: "WLAN_SET_STA_REFRESH"
            }
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function Z() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: 1,
                cmd: "scan_finish,EX_APLIST,EX_APLIST1"
            }
        }

        function dh(di) {
            if (di) {
                if (di.scan_finish == "0") {
                    return {
                        scan_finish: "0",
                        hotspotList: []
                    }
                }
                if (di.scan_finish == "2") {
                    return {
                        scan_finish: "2",
                        hotspotList: []
                    }
                }
                var dn = [];
                for (var dm = 0; dm <= 1; dm++) {
                    var dq;
                    if (dm == 0) {
                        dq = di.EX_APLIST
                    } else {
                        dq = di.EX_APLIST1
                    }
                    var dl = dq.split(";");
                    for (var dk = 0; dk < dl.length; dk++) {
                        var dp = dl[dk].split(",");
                        if (!dp[0]) {
                            break
                        }
                        var dj = {
                            fromProvider: dp[0],
                            connectStatus: dp[1],
                            ssid: dp[2],
                            signal: dp[3],
                            channel: dp[4],
                            authMode: dp[5],
                            encryptType: dp[6],
                            mac: dp[7]
                        };
                        dn.push(dj)
                    }
                }
                return {
                    scan_finish: "1",
                    hotspotList: dn
                }
            } else {
                return X
            }
        }
    }

    function cR(dh) {
        var dg = [];
        dg.push(dh.profileName);
        dg.push(dh.fromProvider || "0");
        dg.push(dh.connectStatus || "0");
        dg.push(dh.signal);
        dg.push(dh.ssid);
        dg.push(dh.authMode);
        dg.push(dh.encryptType);
        dg.push(dh.password || "0");
        dg.push(dh.keyID);
        dg.push(dh.mac);
        return dg.join(",")
    }

    function al() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(ds) {
            var dt = ds.apList;
            var di = "modify";
            if (ds.profileName == "") {
                di = "add";
                var dn = (jQuery.fn.jquery + Math.random()).replace(/\D/g, "");
                ds.profileName = dn;
                dt.push({
                    profileName: dn,
                    fromProvider: "0",
                    connectStatus: "0",
                    signal: ds.signal,
                    ssid: ds.ssid,
                    authMode: ds.authMode,
                    encryptType: ds.encryptType,
                    password: ds.password || "0",
                    keyID: ds.keyID,
                    mac: ds.mac
                })
            }
            var dq = {
                profile0: []
            };
            for (var dj = 1; dj < aJ.AP_STATION_LIST_LENGTH; dj++) {
                dq["profile" + dj] = []
            }
            var dk = "";
            for (var dj = 0; dj < dt.length; dj++) {
                var dm = "";
                if (ds.profileName == dt[dj].profileName) {
                    dm = cR(ds);
                    dk = dm
                } else {
                    dm = cR(dt[dj])
                }
                var dl = parseInt(dj % 10);
                dq["profile" + dl].push(dm)
            }
            var dp = {
                wifi_profile: dq.profile0.join(";")
            };
            for (var dj = 1; dj < aJ.AP_STATION_LIST_LENGTH; dj++) {
                dp["wifi_profile" + dj] = dq["profile" + dj].join(";")
            }
            var dr = cT.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: dt.length,
                wifi_update_profile: dk,
                action: di
            }, dp);
            return dr
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cZ() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(ds) {
            var du = ds.apList;
            var dq = {
                profile0: []
            };
            for (var dj = 1; dj < aJ.AP_STATION_LIST_LENGTH; dj++) {
                dq["profile" + dj] = []
            }
            var di = false;
            var dl = "";
            for (var dj = 0; dj < du.length; dj++) {
                var dn = cR(du[dj]);
                if (du[dj].profileName == ds.profileName) {
                    di = true;
                    dl = dn;
                    continue
                }
                var dt = dj;
                if (di) {
                    dt = dj - 1
                }
                var dm = parseInt(dt % 10);
                dq["profile" + dm].push(dn)
            }
            var dk = di ? du.length - 1 : du.length;
            var dp = {
                wifi_profile: dq.profile0.join(";")
            };
            for (var dj = 1; dj < aJ.AP_STATION_LIST_LENGTH; dj++) {
                dp["wifi_profile" + dj] = dq["profile" + dj].join(";")
            }
            var dr = cT.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: dk,
                wifi_update_profile: dl,
                action: "delete"
            }, dp);
            return dr
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bI() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di) {
            return {
                goformId: "WLAN_SET_STA_CON",
                EX_SSID1: di.EX_SSID1,
                EX_AuthMode: di.EX_AuthMode,
                EX_EncrypType: di.EX_EncrypType,
                EX_DefaultKeyID: di.EX_DefaultKeyID,
                EX_WEPKEY: di.EX_WEPKEY,
                EX_WPAPSK1: di.EX_WPAPSK1,
                EX_wifi_profile: di.EX_wifi_profile,
                EX_mac: di.EX_mac
            }
        }

        function dh(di) {
            if (di && (di.result == "success" || di.result == "processing")) {
                return di
            } else {
                return X
            }
        }
    }

    function aM() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di) {
            return {
                goformId: "WLAN_SET_STA_DISCON"
            }
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cW() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: 1,
                cmd: "blc_wan_mode,blc_wan_auto_mode,loginfo,ppp_status,rj45_state,ethwan_mode"
            }
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                if (dj.blc_wan_mode == "AUTO") {
                    di.blc_wan_mode = dj.blc_wan_auto_mode ? dj.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    di.blc_wan_mode = dj.blc_wan_mode ? dj.blc_wan_mode : "PPP"
                }
                di.loginfo = dj.loginfo;
                di.ppp_status = dj.ppp_status;
                di.rj45_state = (typeof dj.rj45_state == "undefined" || dj.rj45_state == "") ? "dead" : dj.rj45_state;
                di.ethwan_mode = dj.ethwan_mode.toUpperCase();
                return di
            } else {
                return X
            }
        }
    }

    function a5() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                cmd: "rj45_plug"
            }
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.rj45_plug = dj.rj45_plug == "" ? "wan_lan_off" : dj.rj45_plug;
                return di
            } else {
                return X
            }
        }
    }

    function cB(dg, dh) {
        if (aJ.RJ45_SUPPORT) {
            if (dh == "dead" || dh == "") {
                return "PPP"
            } else {
                if (!dg || dg == "undefined") {
                    if (dh == "working") {
                        return "PPPOE"
                    } else {
                        return "PPP"
                    }
                } else {
                    return dg
                }
            }
        } else {
            return "PPP"
        }
    }

    function bk(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({
                goformId: "OPERATION_MODE"
            }, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function a8() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: 1,
                cmd: "opms_wan_auto_mode,ethwan_mode,pppoe_username,pppoe_cc,ethwan_dialmode,ppp_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,rj45_state,lan_ipaddr,lan_netmask"
            }
        }

        function dh(di) {
            if (di) {
                return {
                    opms_wan_auto_mode: di.opms_wan_auto_mode,
                    ethwan_mode: di.ethwan_mode.toUpperCase(),
                    pppoe_username: di.pppoe_username,
                    pppoe_cc: di.pppoe_cc,
                    ethwan_dialmode: di.ethwan_dialmode == "manual" ? "manual_dial" : "auto_dial",
                    ppp_status: di.ppp_status,
                    static_wan_ipaddr: di.static_wan_ipaddr,
                    static_wan_netmask: di.static_wan_netmask,
                    static_wan_gateway: di.static_wan_gateway,
                    static_wan_primary_dns: di.static_wan_primary_dns,
                    static_wan_secondary_dns: di.static_wan_secondary_dns,
                    rj45_state: (typeof di.rj45_state == "undefined" || di.rj45_state == "") ? "dead" : di.rj45_state,
                    lan_ipaddr: di.lan_ipaddr,
                    lan_netmask: di.lan_netmask
                }
            } else {
                return X
            }
        }
    }

    function cF(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({
                notCallback: true
            }, dk);
            return dl
        }

        function di(dk) {
            if (dk.result == "success") {
                dj({
                    result: true
                })
            } else {
                dj({
                    result: false
                })
            }
        }
    }

    function at(dg, dk) {
        return bB(arguments, {}, dh, di, null, false);

        function dh(dl, dm) {
            return {
                multi_data: 1,
                cmd: "sntp_year,sntp_month,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_static_server0,sntp_static_server1,sntp_static_server2,sntp_server0,sntp_server1,sntp_server2,sntp_server3,sntp_server4,sntp_server5,sntp_server6,sntp_server7,sntp_server8,sntp_server9,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_timezone_index,sntp_dst_enable,ppp_status,sntp_process_result,rj45_state"
            }
        }

        function di(dl) {
            if (dl) {
                var dm = dj(dl);
                return {
                    sntp_year: dl.sntp_year,
                    sntp_month: dl.sntp_month,
                    sntp_day: dl.sntp_day,
                    sntp_hour: dl.sntp_hour,
                    sntp_minute: dl.sntp_minute,
                    sntp_second: dl.sntp_second,
                    sntp_time_set_mode: dl.sntp_time_set_mode,
                    sntp_servers: dm,
                    sntp_server0: dl.sntp_server0,
                    sntp_server1: dl.sntp_server1,
                    sntp_server2: dl.sntp_server2,
                    sntp_static_server0: dl.sntp_static_server0,
                    sntp_static_server1: dl.sntp_static_server1,
                    sntp_static_server2: dl.sntp_static_server2,
                    sntp_other_server0: dl.sntp_other_server0,
                    sntp_other_server1: dl.sntp_other_server1,
                    sntp_other_server2: dl.sntp_other_server2,
                    sntp_timezone: dl.sntp_timezone,
                    sntp_timezone_index: dl.sntp_timezone_index ? dl.sntp_timezone_index : "0",
                    sntp_dst_enable: dl.sntp_dst_enable,
                    ppp_status: dl.ppp_status,
                    blc_wan_mode: bw.blc_wan_mode,
                    sntp_process_result: dl.sntp_process_result,
                    rj45_state: (typeof dl.rj45_state == "undefined" || dl.rj45_state == "") ? "dead" : dl.rj45_state
                }
            } else {
                return X
            }
        }

        function dj(dl) {
            var dq = [];
            for (var dp = 0; dp < 3; dp++) {
                var dn = "sntp_static_server" + (dp).toString();
                if (dl[dn] != "") {
                    var ds = {};
                    ds.name = dl[dn];
                    ds.value = dl[dn];
                    dq.push(ds)
                }
            }
            var dr = [{
                name: "Other",
                value: "Other"
            }, {
                name: "NONE",
                value: ""
            }];
            for (var dm = 0; dm < 2; dm++) {
                dq.push(dr[dm])
            }
            return dq
        }
    }

    function ca(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({}, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function g(dg, dj) {
        var di = cT.extend({}, dg);
        cT.post("reqproc/proc_post", di, function(dk) {
            if (dk && dk.result == "success") {
                if (dg.manualsettime == "auto") {
                    setTimeout(dh, 2000);
                    dj(dk)
                } else {
                    dj(true)
                }
            } else {
                if (dk && dk.result == "processing") {
                    dj(dk)
                } else {
                    dj(false)
                }
            }
        }, "json");

        function dh() {
            cT.ajax({
                url: "reqproc/proc_get",
                dataType: "json",
                data: {
                    cmd: "sntp_process_result"
                },
                cache: false,
                async: false,
                success: function(dk) {
                    if (dk.sntp_process_result == "failure") {
                        dj(false)
                    } else {
                        if (dk.sntp_process_result == "success") {
                            dj(true)
                        } else {
                            setTimeout(dh, 2000)
                        }
                    }
                },
                error: function() {
                    dj(false)
                }
            })
        }
    }

    function cd(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({}, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function bT() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                cmd: "websURLFilters"
            }
        }

        function dh(di) {
            var dl = [];
            if (di) {
                if (di.websURLFilters.length == 0) {
                    return {
                        urlFilterRules: []
                    }
                } else {
                    var dm = di.websURLFilters.split(";");
                    for (var dk = 0; dk < dm.length; dk++) {
                        var dj = {};
                        dj.index = dk;
                        dj.url = dm[dk];
                        dl.push(dj)
                    }
                    return {
                        urlFilterRules: dl
                    }
                }
            } else {
                return X
            }
        }
    }

    function cq(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({}, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function bK() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: "1",
                cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,wifi_cur_state "
            }
        }

        function dh(di) {
            if (di) {
                return {
                    currentMode: di.wifi_wds_mode,
                    wdsSSID: di.wifi_wds_ssid,
                    wdsAuthMode: di.wifi_wds_AuthMode,
                    wdsEncrypType: di.wifi_wds_EncrypType,
                    wdsWPAPSK1: di.wifi_wds_WPAPSK1,
                    RadioOff: di.wifi_cur_state == "1" ? "1" : "0"
                }
            } else {
                return X
            }
        }
    }

    function aq(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({}, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function x() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: "1",
                cmd: "syslog_mode,debug_level"
            }
        }

        function dh(di) {
            if (di) {
                return {
                    currentMode: di.syslog_mode,
                    debugLevel: di.debug_level
                }
            } else {
                return X
            }
        }
    }

    function bc(dg, dj) {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dk) {
            var dl = cT.extend({}, dk);
            return dl
        }

        function di(dk) {
            if (dk && dk.result == "success") {
                return dk
            } else {
                return X
            }
        }
    }

    function b9() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            return {
                multi_data: "1",
                cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,wifi_cur_state,user_ip_addr,client_mac_address,wifi_mac_white_list"
            }
        }

        function dh(di) {
            if (di) {
                return {
                    ACL_mode: di.ACL_mode,
                    wifi_mac_black_list: di.wifi_mac_black_list,
                    wifi_hostname_black_list: di.wifi_hostname_black_list,
                    RadioOff: di.wifi_cur_state == "1" ? "1" : "0",
                    user_ip_addr: di.user_ip_addr,
                    client_mac_address: di.client_mac_address,
                    wifi_mac_white_list: di.wifi_mac_white_list
                }
            } else {
                return X
            }
        }
    }

    function aE() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di) {
            var dj = cT.extend({
                goformId: "WIFI_MAC_FILTER"
            }, di);
            return dj
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function av() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di) {
            return {
                cmd: "mgmt_quicken_power_on,need_hard_reboot,need_sim_pin",
                multi_data: 1
            }
        }

        function dh(di) {
            return {
                fastbootEnabled: di.mgmt_quicken_power_on == "1" ? "1" : "0",
                need_hard_reboot: di.need_hard_reboot,
                need_sim_pin: di.need_sim_pin == "yes" ? "yes" : "no"
            }
        }
    }

    function bQ() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di) {
            return {
                goformId: "MGMT_CONTROL_POWER_ON_SPEED",
                mgmt_quicken_power_on: di.fastbootEnabled
            }
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function a7() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "TURN_OFF_DEVICE";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aj() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "REBOOT_DEVICE";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aa() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "fota_new_version_state,fota_current_upgrade_state,fota_package_already_download";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                var dj = (di.fota_new_version_state == "has_critical" || di.fota_new_version_state == "has_optional" || di.fota_new_version_state == "already_has_pkg");
                di.hasNewVersion = dj;
                return di
            } else {
                return X
            }
        }
    }

    function bm() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            if (aJ.UPGRADE_TYPE == "OTA") {
                dk.cmd = "is_mandatory"
            } else {
                dk.cmd = "fota_new_version_state"
            }
            return dk
        }

        function dh(di) {
            if (di) {
                if (aJ.UPGRADE_TYPE == "OTA") {
                    return {
                        is_mandatory: di.is_mandatory == "1"
                    }
                } else {
                    return {
                        is_mandatory: di.fota_new_version_state == "has_critical"
                    }
                }
            } else {
                return X
            }
        }
    }

    function cG() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "upgrade_result";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bj() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "fota_current_upgrade_state";
            return dk
        }

        function dh(di) {
            if (di) {
                di.current_upgrade_state = di.fota_current_upgrade_state;
                return di
            } else {
                return X
            }
        }
    }

    function Q() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "fota_pkg_total_size,fota_dl_pkg_size";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function P() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "IF_UPGRADE";
            dk.select_op = di.selectOp;
            if (dk.select_op == "check") {
                dk.ota_manual_check_roam_state = 1
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function G() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "fota_updateMode,fota_updateIntervalDay,fota_allowRoamingUpdate";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return {
                    updateMode: di.fota_updateMode,
                    updateIntervalDay: di.fota_updateIntervalDay,
                    allowRoamingUpdate: di.fota_allowRoamingUpdate
                }
            } else {
                return X
            }
        }
    }

    function an() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SetUpgAutoSetting";
            dk.UpgMode = di.updateMode;
            dk.UpgIntervalDay = di.updateIntervalDay;
            dk.UpgRoamPermission = di.allowRoamingUpdate;
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function dd() {
        return cp({
            nv: ["dm_last_check_time"]
        }, arguments[1], arguments[2])
    }

    function h() {
        return cp({
            nv: ["network_type", "sub_network_type", "rssi", "lte_rscp", "lte_rsrp", "nv_rsrq", "nv_sinr", "lte_band", "cell_id"]
        }, arguments[1], arguments[2])
    }

    function j() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "RESULT_RESTORE";
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function v() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "childGroupList"
            };
            return dk
        }

        function dh(di) {
            if (di && (di.childGroupList || di.devices)) {
                return di
            } else {
                return {
                    devices: []
                }
            }
        }
    }

    function cw() {
        return bB(arguments, aJ.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "ADD_DEVICE",
                mac: di.macAddress
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cK() {
        return bB(arguments, aJ.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "DEL_DEVICE",
                mac: di.mac
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function s(dg) {
        if (typeof aJ.currentUserInChildGroup == "undefined") {
            var dj = [];
            if (typeof dg != "undefined") {
                dj = dg
            } else {
                dj = v({}).devices
            }
            var dh = a3({}).get_user_mac_addr;
            var di = cj.find(dj, function(dk) {
                return dk.mac == dh
            });
            aJ.currentUserInChildGroup = typeof di != "undefined";
            return {
                result: typeof di != "undefined"
            }
        }
        return {
            result: aJ.currentUserInChildGroup
        }
    }

    function a3() {
        return cp({
            nv: "get_user_mac_addr"
        }, arguments[1], arguments[2])
    }

    function u() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "hostNameList"
            };
            return dk
        }

        function dh(di) {
            if (di && (di.hostNameList || di.devices)) {
                return di
            } else {
                return {
                    devices: []
                }
            }
        }
    }

    function bi() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "EDIT_HOSTNAME",
                mac: di.mac,
                hostname: di.hostname
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function c7() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "site_white_list"
            };
            return dk
        }

        function dh(di) {
            if (di && (di.site_white_list || di.siteList)) {
                return di
            } else {
                return {
                    siteList: []
                }
            }
        }
    }

    function F() {
        return bB(arguments, aJ.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "REMOVE_WHITE_SITE",
                ids: di.ids.join(",")
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function bD() {
        return bB(arguments, aJ.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "ADD_WHITE_SITE",
                name: di.name,
                site: di.site
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function b8() {
        var dj = {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": []
        };
        return bB(arguments, {}, dg, di, null, false);

        function dg(dk, dl) {
            var dm = {
                cmd: "time_limited"
            };
            return dm
        }

        function di(dk) {
            if (dk) {
                return dh(dk)
            } else {
                return dj
            }
        }

        function dh(dk) {
            if (dk.time_limited == "") {
                return {
                    time_limited: []
                }
            }
            var dl = dk.time_limited.split(";");
            cj.each(dl, function(dm) {
                var dn = dm.split("+");
                if (dn.length == 2) {
                    dj[dn[0]] = dn[1].split(",")
                }
            });
            return dj
        }
    }

    function n() {
        return bB(arguments, aJ.currentUserInChildGroup == false ? {} : {
            errorType: "no_auth"
        }, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "SAVE_TIME_LIMITED",
                time_limited: di.time
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cx() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "openEnable,closeEnable,openTime,closeTime",
                multi_data: "1"
            };
            return dk
        }

        function dh(di) {
            if (di) {
                if (di.openTime.indexOf(":") != -1) {
                    var dj = di.openTime.split(":");
                    di.openH = leftInsert(dj[0], 2, "0");
                    di.openM = leftInsert(dj[1], 2, "0")
                } else {
                    di.openH = "06";
                    di.openM = "00"
                }
                if (di.closeTime.indexOf(":") != -1) {
                    var dk = di.closeTime.split(":");
                    di.closeH = leftInsert(dk[0], 2, "0");
                    di.closeM = leftInsert(dk[1], 2, "0")
                } else {
                    di.closeH = "22";
                    di.closeM = "00"
                }
                return di
            } else {
                return X
            }
        }
    }

    function bP() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "SAVE_TSW",
                openEnable: di.openEnable,
                closeEnable: di.closeEnable
            };
            if (di.openEnable == "1") {
                dk.openTime = di.openTime;
                dk.closeTime = di.closeTime
            }
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                if (di && di.result == "failure") {
                    return di
                } else {
                    return X
                }
            }
        }
    }

    function aP() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {
                goformId: "FLOW_CALIBRATION_MANUAL",
                calibration_way: di.way,
                time: di.way == "time" ? di.value : 0,
                data: di.way == "data" ? di.value : 0
            };
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cp() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            if (cj.isArray(di.nv)) {
                dk.cmd = di.nv.join(",");
                dk.multi_data = 1
            } else {
                dk.cmd = di.nv
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function aR() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "vwim_mc_state,traffic_overrun,detect_new_version";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.vwim_mc_state = dj.vwim_mc_state;
                di.traffic_overrun = dj.traffic_overrun;
                di.detect_new_version = dj.detect_new_version;
                di.blc_wan_mode = bw.blc_wan_mode;
                return di
            } else {
                return X
            }
        }
    }

    function cN() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "CLEAR_REDIRECT_FLAG";
            dk.flag_id = di.redirectFlags;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function b7() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "lock_zone_enable,pin_interlock_and_V4_lock";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bN() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "PIN_LOCK_V4_ENCODE";
            dk.pin_interlock_and_V4_lock = di.pin_interlock_and_V4_lock;
            dk.TspLock_key_data = di.TspLock_key_data;
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function aI() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "cell_id_list,global_cell_id,network_type,sub_network_type,cell_not_correct";
            dk.multi_data = 1;
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function b1() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "LOCK_ZONE";
            dk.lock_zone_enable = di.lock_zone_enable;
            return dk
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return X
            }
        }
    }

    function cV() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {
                cmd: "update_type"
            };
            return dk
        }

        function dh(di) {
            return {
                update_type: di.update_type ? di.update_type : "mifi_fota"
            }
        }
    }

    function cv() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dk, di) {
            var dj = {};
            dj.goformId = "alk_set_lan_dns_config";
            dj.lan_dns_ip = dk.lan_dns_ip;
            dj.lan_dns_mode = dk.lan_dns_mode;
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function f() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dj) {
            var dk = {};
            dk.cmd = "AuthMode,passPhrase";
            dk.multi_data = 1;
            return dk
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.AuthMode = dj.AuthMode;
                di.passPhrase = aJ.PASSWORD_ENCODE ? Base64.decode(dj.passPhrase) : dj.passPhrase;
                return di
            } else {
                return X
            }
        }
    }

    function z() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "SET_WIFI_SECURITY_INFO";
            dk.AuthMode = di.AuthMode;
            if (dk.AuthMode == "WPAPSKWPA2PSK") {
                dk.passPhrase = aJ.PASSWORD_ENCODE ? Base64.encode(di.passPhrase) : di.passPhrase
            }
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function ci() {
        az(arguments, dg, dh);

        function dg(di) {
            var dj = {
                goformId: "SET_WIFI_SSID1_SETTINGS",
                ssid: di.SSID,
                broadcastSsidEnabled: di.broadcast,
                MAX_Access_num: di.station,
                security_mode: di.AuthMode,
                cipher: di.cipher,
                NoForwarding: di.NoForwarding,
                show_qrcode_flag: di.show_qrcode_flag
            };
            if (aJ.WIFI_WEP_SUPPORT) {
                dj.wep_default_key = di.wep_default_key;
                dj.wep_key_1 = di.wep_key_1;
                dj.wep_key_2 = di.wep_key_2;
                dj.wep_key_3 = di.wep_key_3;
                dj.wep_key_4 = di.wep_key_4;
                if (di.wep_default_key == "1") {
                    dj.WEP2Select = di.WEP2Select
                } else {
                    if (di.wep_default_key == "2") {
                        dj.WEP3Select = di.WEP3Select
                    } else {
                        if (di.wep_default_key == "3") {
                            dj.WEP4Select = di.WEP4Select
                        } else {
                            dj.WEP1Select = di.WEP1Select
                        }
                    }
                }
            }
            if (di.AuthMode == "WPAPSK" || di.AuthMode == "WPA2PSK" || di.AuthMode == "WPAPSKWPA2PSK" || di.AuthMode == "WPA3Personal" || di.AuthMode == "WPA2WPA3") {
                dj.security_shared_mode = di.cipher;
                dj.passphrase = aJ.PASSWORD_ENCODE ? Base64.encode(di.passPhrase) : di.passPhrase
            } else {
                if (di.AuthMode == "SHARED") {
                    dj.security_shared_mode = "WEP";
                    dj.security_mode = "SHARED"
                } else {
                    if (di.encryptType == "WEP") {
                        dj.security_shared_mode = "WEP";
                        dj.security_mode = "OPEN"
                    } else {
                        dj.security_shared_mode = "NONE"
                    }
                }
            }
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function bM() {
        az(arguments, dg, dh);

        function dg(di) {
            var dj = {
                goformId: "SET_WIFI_SSID2_SETTINGS",
                m_SSID: di.m_SSID,
                m_HideSSID: di.m_broadcast,
                m_MAX_Access_num: di.m_station,
                m_AuthMode: di.m_AuthMode,
                cipher: di.m_cipher,
                m_NoForwarding: di.m_NoForwarding,
                m_show_qrcode_flag: di.m_show_qrcode_flag
            };
            if (aJ.WIFI_WEP_SUPPORT) {
                dj.m_DefaultKeyID = di.m_wep_default_key;
                dj.m_Key1Str1 = di.m_wep_key_1;
                dj.m_Key2Str1 = di.m_wep_key_2;
                dj.m_Key3Str1 = di.m_wep_key_3;
                dj.m_Key4Str1 = di.m_wep_key_4;
                if (di.m_wep_default_key == "1") {
                    dj.m_Key2Type = di.m_WEP2Select
                } else {
                    if (di.m_wep_default_key == "2") {
                        dj.m_Key3Type = di.m_WEP3Select
                    } else {
                        if (di.m_wep_default_key == "3") {
                            dj.m_Key4Type = di.m_WEP4Select
                        } else {
                            dj.m_Key1Type = di.m_WEP1Select
                        }
                    }
                }
            }
            if (di.m_AuthMode == "WPAPSK" || di.m_AuthMode == "WPA2PSK" || di.m_AuthMode == "WPAPSKWPA2PSK" || di.m_AuthMode == "WPA3Personal" || di.m_AuthMode == "WPA2WPA3") {
                dj.m_EncrypType = di.m_cipher;
                dj.m_WPAPSK1 = aJ.PASSWORD_ENCODE ? Base64.encode(di.m_passPhrase) : di.m_passPhrase
            } else {
                if (di.m_AuthMode == "SHARED") {
                    dj.m_EncrypType = "WEP";
                    dj.m_security_mode = "SHARED"
                } else {
                    if (di.m_encryptType == "WEP") {
                        dj.m_EncrypType = "WEP";
                        dj.m_security_mode = "OPEN"
                    } else {
                        dj.m_EncrypType = "NONE"
                    }
                }
            }
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function cC() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dk, di) {
            var dj = {};
            dj.cmd = "lte_band,cell_id,ping_google";
            dj.multi_data = 1;
            return dj
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.lte_band = dj.lte_band;
                di.cell_id = dj.cell_id;
                di.ping_google = dj.ping_google;
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function q() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dk, di) {
            var dj = {};
            dj.cmd = "work_lte_band";
            dj.multi_data = 1;
            return dj
        }

        function dh(dj) {
            if (dj) {
                var di = {};
                di.work_lte_band = dj.work_lte_band;
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function T() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dk, di) {
            var dj = {};
            dj.goformId = "SET_FREQ_BAND";
            dj.work_lte_band = dk.work_lte_band;
            dj.ping_google = dk.ping_google;
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function d() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(di, dk) {
            var dl = {};
            if (aJ.WIFI_HAS_5G) {
                var dj = aJ.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode,WPAPSK1_encode_5g,m_WPAPSK1_encode_5g," : "imei,rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,WPAPSK1_enaes_5g,m_WPAPSK1_enaes_5g,";
                dl.cmd = "m_ssid_enable,wifi_cur_state,NoForwarding,m_NoForwarding,NoForwarding_5g,m_NoForwarding_5g," + dj + "MAX_Station_num,SSID1,AuthMode,HideSSID,MAX_Access_num,show_qrcode_flag,EncrypType,Key1Str1,Key2Str1,Key3Str1,Key4Str1,DefaultKeyID,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,m_show_qrcode_flag,m_DefaultKeyID,m_Key1Str1,m_Key2Str1,m_Key3Str1,m_Key4Str1,rotationFlag,wifi_sta_connection,SSID1_5g,AuthMode_5g,HideSSID_5g,MAX_Access_num_5g,show_qrcode_flag_5g,EncrypType_5g,Key1Str1_5g,Key2Str1_5g,Key3Str1_5g,Key4Str1_5g,DefaultKeyID_5g,m_SSID_5g,m_AuthMode_5g,m_HideSSID_5g,m_MAX_Access_num_5g,m_EncrypType_5g,m_show_qrcode_flag_5g,m_DefaultKeyID_5g,m_Key1Str1_5g,m_Key2Str1_5g,m_Key3Str1_5g,m_Key4Str1_5g,wifi_band"
            } else {
                var dj = aJ.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "imei,rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
                dl.cmd = "m_ssid_enable,wifi_cur_state,NoForwarding,m_NoForwarding," + dj + "MAX_Station_num,SSID1,AuthMode,HideSSID,MAX_Access_num,show_qrcode_flag,EncrypType,Key1Str1,Key2Str1,Key3Str1,Key4Str1,DefaultKeyID,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,m_show_qrcode_flag,m_DefaultKeyID,m_Key1Str1,m_Key2Str1,m_Key3Str1,m_Key4Str1,rotationFlag,wifi_sta_connection"
            }
            dl.multi_data = 1;
            return dl
        }

        function dh(dj) {
            if (dj) {
                var di = {
                    wifi_enable: dj.wifi_cur_state == "1" ? "1" : "0",
                    multi_ssid_enable: dj.m_ssid_enable,
                    MAX_Station_num: cT.isNumeric(dj.MAX_Station_num) ? dj.MAX_Station_num : aJ.MAX_STATION_NUMBER,
                    AuthMode: dj.AuthMode,
                    SSID: dj.SSID1,
                    broadcast: dj.HideSSID,
                    apIsolation: dj.NoForwarding,
                    passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(dj.WPAPSK1_encode) : c(dj.rnum_js, dj.imei, dj.WPAPSK1_enaes),
                    MAX_Access_num: dj.MAX_Access_num,
                    cipher: dj.EncrypType == "TKIP" ? "0" : dj.EncrypType == "AES" ? 1 : 2,
                    encryptType: dj.EncrypType,
                    show_qrcode_flag: dj.show_qrcode_flag == "1" ? true : false,
                    keyID: dj.DefaultKeyID,
                    Key1Str1: dj.Key1Str1,
                    Key2Str1: dj.Key2Str1,
                    Key3Str1: dj.Key3Str1,
                    Key4Str1: dj.Key4Str1,
                    m_SSID: dj.m_SSID,
                    m_broadcast: dj.m_HideSSID,
                    m_apIsolation: dj.m_NoForwarding,
                    m_MAX_Access_num: dj.m_MAX_Access_num,
                    m_AuthMode: dj.m_AuthMode,
                    m_passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(dj.m_WPAPSK1_encode) : c(dj.rnum_js, dj.imei, dj.m_WPAPSK1_enaes),
                    m_cipher: dj.m_EncrypType == "TKIP" ? "0" : dj.m_EncrypType == "AES" ? 1 : 2,
                    m_show_qrcode_flag: dj.m_show_qrcode_flag == "1" ? true : false,
                    m_encryptType: dj.m_EncrypType,
                    m_keyID: dj.m_DefaultKeyID,
                    m_Key1Str1: dj.m_Key1Str1,
                    m_Key2Str1: dj.m_Key2Str1,
                    m_Key3Str1: dj.m_Key3Str1,
                    m_Key4Str1: dj.m_Key4Str1,
                    rotationFlag: dj.rotationFlag,
                    ap_station_enable: dj.wifi_sta_connection
                };
                if (aJ.WIFI_HAS_5G && dj.wifi_band == "a") {
                    di = {
                        wifi_enable: dj.wifi_cur_state == "1" ? "1" : "0",
                        multi_ssid_enable: dj.m_ssid_enable,
                        MAX_Station_num: cT.isNumeric(dj.MAX_Station_num) ? dj.MAX_Station_num : aJ.MAX_STATION_NUMBER,
                        AuthMode: dj.AuthMode_5g,
                        SSID: dj.SSID1_5g,
                        broadcast: dj.HideSSID_5g,
                        apIsolation: dj.NoForwarding_5g,
                        passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(dj.WPAPSK1_encode_5g) : c(dj.rnum_js, dj.imei, dj.WPAPSK1_enaes_5g),
                        MAX_Access_num: dj.MAX_Access_num_5g,
                        cipher: dj.EncrypType_5g == "TKIP" ? "0" : dj.EncrypType_5g == "AES" ? 1 : 2,
                        encryptType: dj.EncrypType_5g,
                        show_qrcode_flag: dj.show_qrcode_flag_5g == "1" ? true : false,
                        keyID: dj.DefaultKeyID_5g,
                        Key1Str1: dj.Key1Str1_5g,
                        Key2Str1: dj.Key2Str1_5g,
                        Key3Str1: dj.Key3Str1_5g,
                        Key4Str1: dj.Key4Str1_5g,
                        m_SSID: dj.m_SSID_5g,
                        m_broadcast: dj.m_HideSSID_5g,
                        m_apIsolation: dj.m_NoForwarding_5g,
                        m_MAX_Access_num: dj.m_MAX_Access_num_5g,
                        m_AuthMode: dj.m_AuthMode_5g,
                        m_passPhrase: aJ.PASSWORD_ENCODE ? Base64.decode(dj.m_WPAPSK1_encode_5g) : c(dj.rnum_js, dj.imei, dj.m_WPAPSK1_enaes_5g),
                        m_cipher: dj.m_EncrypType_5g == "TKIP" ? "0" : dj.m_EncrypType_5g == "AES" ? 1 : 2,
                        m_show_qrcode_flag: dj.m_show_qrcode_flag_5g == "1" ? true : false,
                        m_encryptType: dj.m_EncrypType_5g,
                        m_keyID: dj.m_DefaultKeyID_5g,
                        m_Key1Str1: dj.m_Key1Str1_5g,
                        m_Key2Str1: dj.m_Key2Str1_5g,
                        m_Key3Str1: dj.m_Key3Str1_5g,
                        m_Key4Str1: dj.m_Key4Str1_5g,
                        rotationFlag: dj.rotationFlag,
                        ap_station_enable: dj.wifi_sta_connection
                    }
                }
                return di
            } else {
                return X
            }
        }
    }

    function t() {
        az(arguments, dg, dh);

        function dg(di) {
            var dk = di;
            if (di.wifiEnabled == "0") {
                dk = {
                    wifiEnabled: di.wifiEnabled
                }
            }
            var dj = cT.extend({
                goformId: "SET_WIFI_INFO"
            }, dk);
            return dj
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function b0() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dj, di) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_server,alk_vpn_type,alk_vpn_user,alk_vpn_passwd,alk_vpn_encrypt,alk_vpn_status,vpn_channel,alk_vpn_l2tp_server,alk_vpn_l2tp_channel,alk_vpn_l2tp_user,alk_vpn_l2tp_passwd"
            }
        }

        function dh(dj) {
            if (dj) {
                if (dj.alk_vpn_type == "pptp") {
                    var di = {
                        alk_vpn_type: dj.alk_vpn_type,
                        alk_vpn_server: dj.alk_vpn_server,
                        vpn_channel: dj.vpn_channel,
                        alk_vpn_user: dj.alk_vpn_user,
                        alk_vpn_passwd: dj.alk_vpn_passwd,
                        alk_vpn_encrypt: dj.alk_vpn_encrypt,
                        alk_vpn_status: dj.alk_vpn_status
                    }
                } else {
                    var di = {
                        alk_vpn_type: dj.alk_vpn_type,
                        alk_vpn_server: dj.alk_vpn_l2tp_server,
                        vpn_channel: dj.alk_vpn_l2tp_channel,
                        alk_vpn_user: dj.alk_vpn_l2tp_user,
                        alk_vpn_passwd: dj.alk_vpn_l2tp_passwd,
                        alk_vpn_encrypt: dj.alk_vpn_encrypt,
                        alk_vpn_status: dj.alk_vpn_status
                    }
                }
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function au() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dj, di) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_server,alk_vpn_type,alk_vpn_user,alk_vpn_passwd,alk_vpn_encrypt,alk_vpn_status,vpn_channel"
            }
        }

        function dh(dj) {
            if (dj) {
                var di = {
                    alk_vpn_server: dj.alk_vpn_server,
                    vpn_channel: dj.vpn_channel,
                    alk_vpn_user: dj.alk_vpn_user,
                    alk_vpn_passwd: dj.alk_vpn_passwd,
                    alk_vpn_encrypt: dj.alk_vpn_encrypt,
                    alk_vpn_status: dj.alk_vpn_status
                };
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function de() {
        return bB(arguments, {}, dg, dh, null, false);

        function dg(dj, di) {
            return {
                multi_data: 1,
                cmd: "alk_vpn_status,alk_vpn_l2tp_server,alk_vpn_l2tp_channel,alk_vpn_l2tp_user,alk_vpn_l2tp_passwd"
            }
        }

        function dh(dj) {
            if (dj) {
                var di = {
                    alk_vpn_server: dj.alk_vpn_l2tp_server,
                    vpn_channel: dj.alk_vpn_l2tp_channel,
                    alk_vpn_user: dj.alk_vpn_l2tp_user,
                    alk_vpn_passwd: dj.alk_vpn_l2tp_passwd,
                    alk_vpn_status: dj.alk_vpn_status
                };
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function cs() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dk, di) {
            var dj = {};
            dj.goformId = "ALK_VPN_SET";
            dj.vpn_server = dk.alk_vpn_server;
            dj.vpn_type = dk.alk_vpn_type;
            dj.vpn_user = dk.alk_vpn_user;
            dj.vpn_passwd = dk.alk_vpn_passwd;
            dj.vpn_channel = dk.vpn_channel;
            dj.vpn_encrypt = dk.alk_vpn_encrypt;
            return dj
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function by() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(di, dj) {
            var dk = {};
            dk.goformId = "ALK_VPN_CONNECT";
            return dk
        }

        function dh(di) {
            if (di) {
                return di
            } else {
                return X
            }
        }
    }

    function y() {
        return bB(arguments, {}, dh, di, null, true);

        function dh(dj, dk) {
            var dl = {};
            dl.goformId = "ALK_VPN_DISCONNECT";
            return dl
        }

        function di(dj) {
            if (dj) {
                return dj
            } else {
                return X
            }
        }

        function dg(dj) {
            if (dj.ppp_status == "ppp_disconnecting") {
                timerInfo.connectStatus = "ppp_disconnecting"
            } else {
                if (dj.ppp_status == "ppp_disconnected") {
                    C(dg);
                    timerInfo.connectStatus = "ppp_disconnected";
                    callback({
                        result: true,
                        status: timerInfo.connectStatus
                    })
                } else {
                    if (new Date().getTime() - checkPoint < 10000) {
                        timerInfo.connectStatus = "ppp_disconnecting"
                    } else {
                        C(dg);
                        callback({
                            result: false
                        })
                    }
                }
            }
        }
    }

    function bR(dg, dj) {
        return bB(arguments, {}, dh, di, null, false);

        function dh(dk, dl) {
            return {
                multi_data: 1,
                cmd: "alk_eth_mode"
            }
        }

        function di(dk) {
            if (dk) {
                return {
                    alk_eth_mode: dk.alk_eth_mode
                }
            } else {
                return X
            }
        }
    }

    function bC() {
        return bB(arguments, {}, dg, dh, null, true);

        function dg(dk, di) {
            var dj = {};
            dj.goformId = "ALK_SET_NET_MODE";
            dj.alk_eth_mode = dk.alk_eth_mode;
            return dj
        }

        function dh(di) {
            if (di && di.result == "success") {
                return di
            } else {
                return unknownErrorObject
            }
        }
    }

    function bB(dl, dt, dm, di, dh, dj) {
        var dq = dl[0],
            ds = dl[1],
            dk = dl[2];
        var dn;
        if (dt && typeof dt.errorType === "string") {
            dn = cT.extend(X, dt);
            if (!ds) {
                return dn
            }
            dr(dn, ds, dk)
        } else {
            dn = cT.extend({}, dt);
            var dp;
            if (dm) {
                dp = dm(dq, dj)
            } else {
                dp = dq
            }
            if (!ds) {
                if (dp && (dp.cmd || dp.goformId)) {
                    var dg = cy(dp, dj);
                    if (di) {
                        dn = cT.extend({}, di(dg))
                    } else {
                        dn = dg
                    }
                }
                return dn
            } else {
                if (dp && (dp.cmd || dp.goformId)) {
                    dc(dp, function(du) {
                        if (di) {
                            dn = cT.extend({}, di(du))
                        } else {
                            dn = cT.extend({}, du)
                        }
                        if (!dp.notCallback) {
                            dr(dn, ds, dk)
                        }
                    }, function() {
                        if (dh) {
                            dn = cT.extend(X, dh)
                        } else {
                            dn = cT.extend(X, {
                                errorType: "Unknown"
                            })
                        }
                        dr(dn, ds, dk)
                    }, dj)
                } else {
                    dr(dn, ds, dk)
                }
            }
        }

        function dr(du, dw, dv) {
            dv = dv ? dv : dw;
            if (isErrorObject(du)) {
                switch (du.errorType) {
                    case "cellularNetworkError":
                    case "deviceError":
                    case "wifiConnectionError":
                        window.receivedNonSpecificError(du);
                        break;
                    default:
                        dv(du)
                }
            } else {
                dw(du)
            }
        }
    }

    function cy(dg, dh) {
        return bl(dg, null, null, false, dh)
    }

    function dc(di, dg, dh, dj) {
        bl(di, dg, dh, true, dj)
    }

    function w(dg) {
        var di = /^[A-z0-9]+$/;
        var dh = dg.match(di);
        if (dh == null) {
            return "error"
        } else {
            return dg
        }
    }

    function bl(dj, dh, di, dl, dk) {
        var dg = null;
        cT.ajax({
            type: !!dk ? "POST" : "GET",
            url: dk ? "/reqproc/proc_post" : dj.cmd ? "/reqproc/proc_get" : "/reqproc/proc_post",
            data: dj,
            dataType: "json",
            async: !!dl,
            cache: false,
            error: function(dm) {
                if (dl) {
                    di(dm)
                } else {
                    if (dm.status == 200) {
                        dg = jQuery.parseJSON("(" + w(dm.responseText) + ")")
                    }
                }
            },
            success: function(dm) {
                if (dl) {
                    dh(dm)
                } else {
                    dg = dm
                }
            }
        });
        if (!dl) {
            return dg
        }
    }
    var bw = {
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
    var X = {
        errorType: "UnknownError",
        errorId: "123",
        errorText: "UnknownError"
    };
    var cS = true;
    return {
        clearRedirectFlag: cN,
        connect: a9,
        disconnect: R,
        getSIMPhoneBookCapacity: bS,
        getDevicePhoneBookCapacity: ai,
        getDevicePhoneBooks: da,
        getSIMPhoneBooks: cM,
        getPhoneBooks: U,
        getPhoneBookReady: ck,
        getPhoneBooksByGroup: bX,
        deletePhoneBooks: bn,
        deleteAllPhoneBooks: aX,
        deleteAllPhoneBooksByGroup: ab,
        savePhoneBook: cL,
        deleteAllMessages: bW,
        deleteMessage: cE,
        setSmsRead: ag,
        sendSMS: a1,
        saveSMS: aK,
        getSMSReady: aL,
        getSMSMessages: aN,
        getSMSDeliveryReport: L,
        getSmsCapability: b,
        resetNewSmsReceivedVar: E,
        resetSmsReportReceivedVar: b6,
        getSmsSetting: b3,
        setSmsSetting: aS,
        getAttachedCableDevices: bH,
        getCurrentlyAttachedDevicesInfo: bs,
        getConnectionInfo: bA,
        getRedirectData: aR,
        getLanguage: A,
        setLanguage: k,
        getNetSelectInfo: S,
        getSecurityInfo: f,
        setSecurityInfo: z,
        getStatusInfo: e,
        getConnectionMode: K,
        setConnectionMode: ah,
        getSeepdLimitTypes: cr,
        setSeepdLimitTypes: M,
        getWifiBasic: d,
        setWifiBasic: ci,
        setWifiBasic4SSID2: bM,
        setWifiBasicMultiSSIDSwitch: t,
        getWpsInfo: cf,
        openWps: r,
        getSleepMode: cn,
        setSleepMode: bh,
        getWifiAdvance: ct,
        setWifiAdvance: c5,
        getWifiRange: Y,
        setWifiRange: c2,
        getSimSelect: c8,
        setSimSelect: b5,
        getLoginStatus: bf,
        getLoginData: cm,
        login: aQ,
        logout: bv,
        changeManageInfo: bZ,
        getPinData: c3,
        enablePin: df,
        disablePin: b2,
        changePin: o,
        enterPIN: J,
        enterPUK: V,
        getLanInfo: bu,
        setLanInfo: cg,
        getApnSettings: l,
        deleteApn: aB,
        setDefaultApn: bz,
        addOrEditApn: bq,
        getQuickSettingInfo: a6,
        setQuickSetting4IPv6: db,
        scanForNetwork: aH,
        setBearerPreference: bL,
        editHostName: bi,
        getSiteWhiteList: c7,
        removeSiteWhite: F,
        saveSiteWhite: bD,
        setNetwork: bo,
        getUpnpSetting: am,
        setUpnpSetting: a4,
        getDmzSetting: aC,
        setDmzSetting: cY,
        getDeviceInfo: bb,
        getDeviceInfoLow: c0,
        getPortForward: D,
        setPortForward: ar,
        getPortFilter: bg,
        setPortFilterBasic: ak,
        setPortFilter: W,
        deleteFilterRules: aD,
        getPortMap: ba,
        setPortMap: bJ,
        enablePortMap: bG,
        deleteMapRules: a0,
        getTrafficAlertInfo: I,
        setTrafficAlertInfo: ao,
        getCurrentUpgradeState: bj,
        setUpgradeSelectOp: P,
        addTimerThings: bd,
        removeTimerThings: m,
        getPackSizeInfo: Q,
        getMandatory: bm,
        getOTAUpdateSetting: G,
        setOTAUpdateSetting: an,
        getSignalStrength: h,
        getOTAlastCheckTime: dd,
        clearUpdateResult: j,
        refreshAPStationStatus: ac,
        getSntpParams: at,
        setSntpSetting: g,
        setSNTPDate: ca,
        restoreFactorySettings: aA,
        checkRestoreStatus: ad,
        getSysSecurity: bY,
        setSysSecurity: cI,
        deleteForwardRules: cH,
        enableVirtualServer: aF,
        getSDConfiguration: bU,
        setSdCardMode: cA,
        checkFileExists: O,
        getFileList: af,
        fileRename: bE,
        getSdMemorySizes: B,
        deleteFilesAndFolders: aY,
        createFolder: H,
        setSdCardSharing: ce,
        setUpdateInfoWarning: c9,
        getUpdateInfoWarning: b4,
        getAPStationBasic: aw,
        setAPStationBasic: be,
        getWdsInfo: bK,
        setWDS: aq,
        addUrlFilterRule: cd,
        getUrlFilterList: bT,
        deleteSelectedRules: cq,
        getMacFilterInfo: b9,
        setMacFilter: aE,
        getFastbootSetting: av,
        setFastbootSetting: bQ,
        turnOffDevice: a7,
        restart: aj,
        updateTimerFlag: cS,
        childGroupList: v,
        addChildGroup: cw,
        removeChildGroup: cK,
        checkCurrentUserInChildGroup: s,
        getTimeLimited: b8,
        saveTimeLimited: n,
        getHostNameList: u,
        getHotspotList: co,
        searchHotspot: ap,
        getSearchHotspotList: Z,
        saveHotspot: al,
        deleteHotspot: cZ,
        connectHotspot: bI,
        disconnectHotspot: aM,
        getOpMode: cW,
        getRj45PlugState: a5,
        SetOperationMode: bk,
        getPppoeParams: a8,
        setPppoeDialMode: cF,
        getTsw: cx,
        saveTsw: bP,
        trafficCalibration: aP,
        getParams: cp,
        getNewVersionState: aa,
        getUpgradeResult: cG,
        getV4Switch: b7,
        setV4Switch: bN,
        getCellId: aI,
        setCellIdSwitch: b1,
        getDdnsParams: bV,
        setDDNSForward: aU,
        getUpdateType: cV,
        getCurretnMAC: aT,
        getUSSDResponse: cD,
        USSDReplyCancel: p,
        getNetworkUnlockTimes: cl,
        unlockNetwork: aO,
        getSyslogInfo: x,
        setSysLog: bc,
        getNetInfo: cC,
        getNetBandInfo: q,
        setselectedband: T,
        getVpnSettings: b0,
        setVpnSettings: cs,
        getVpnSettings_l2tp: de,
        getVpnSettings_pptp: au,
        Vpnconnect: by,
        VPNdisconnect: y,
        setEth_mode: bC,
        getEth_mode: bR,
        setIMEI: bF,
        setTTL: bt,
        setDnsLan: cv,
        getIMEITTL: cJ,
        getRebootTimeEnable: ax,
        SetRebootTimeEnable: cu,
        getRebootTime: c4,
        getDisconnetReboot: cX,
        SetDisconnetReboot: cc,
        setSimSelect_with_pwd: N
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
define("adm_others", "jquery knockout set service underscore".split(" "), function(c, a, s, u, t) {
    var p = t.map(s.diconntReboot, function(v) {
        return new Option(v.name, v.value)
    });
    var d = t.map(s.sntpTimeSetMode, function(v) {
        return new Option(v.name, v.value)
    });
    var e = t.map(s.timeZone, function(v) {
        return new Option(v.name, v.value)
    });
    var g = t.map(s.daylightSave, function(v) {
        return new Option(v.name, v.value)
    });
    var h = t.map(s.SIM_SELECTS, function(v) {
        return new Option(v.name, v.value)
    });
    var k = [];
    var f = [];
    var b = [];
    var m = [];
    var j = [];
    var r = [1, 3, 5, 7, 8, 10, 12];
    var l = [4, 6, 9, 11];

    function q(z, v, y) {
        var x = {};
        for (var w = z; w <= v; w++) {
            x.name = w;
            x.value = w;
            y.push(new Option(x.name, x.value))
        }
    }
    q(2000, 2030, k);
    q(1, 12, f);
    q(0, 23, m);
    q(0, 59, j);

    function o() {
        var D = this;
        var F = false;
        D.fastbootSupport = s.FAST_BOOT_SUPPORT;
        D.turnOffSupport = s.TURN_OFF_SUPPORT;
        D.SNTPSupport = s.HAS_SNTP;
        D.hasUssd = s.HAS_USSD;
        D.hasDdns = s.DDNS_SUPPORT;
        D.hasUpdateCheck = s.HAS_UPDATE_CHECK;
        D.hasUssd = s.HAS_USSD;
        D.hasDdns = s.DDNS_SUPPORT;
        D.selectedType = a.observable(u.getDisconnetReboot().network_detect_switch);
        D.types = a.observableArray(p);
        var x = u.getLanInfo();
        D.dnsIpAddress = a.observable(x.lan_dns_ip);
        D.dnsServer = a.observable(x.lan_dns_mode);
        D.selectMode = a.observable();
        D.password = a.observable();
        var I = u.getSimSelect();
        D.modes = a.observableArray(h);
        D.selectMode = a.observable(I.alk_sim_select);
        if (s.HAS_PARENTAL_CONTROL) {
            F = u.checkCurrentUserInChildGroup().result
        }
        D.currentUserInChildGroup = a.observable(F);
        var G = u.getFastbootSetting();
        D.fastbootEnableFlag = a.observable(s.RJ45_SUPPORT ? (G.need_sim_pin != "yes" && u.getRj45PlugState().rj45_plug == "wan_lan_off") : G.need_sim_pin != "yes");
        D.fastbootSetting = a.observable(G.fastbootEnabled);
        var C = u.getRebootTime();
        D.reboottime = a.observable(C.midnight_reboot_hour);
        var H = u.getRebootTimeEnable();
        D.select_reboottime = a.observable(H.midnight_reboot_switch);
        D.saveReboottime = y;
        addInterval(function() {
            D.fastbootEnableFlag(s.RJ45_SUPPORT ? (G.need_sim_pin != "yes" && u.getRj45PlugState().rj45_plug == "wan_lan_off") : G.need_sim_pin != "yes")
        }, 1000);
        D.dnsSave = function() {
            showLoading("waiting");
            var J = {
                lan_dns_ip: D.dnsIpAddress(),
                lan_dns_mode: D.dnsServer()
            };
            u.setDnsLan(J, function(K) {
                if ("success" == K.result) {
                    showConfirm("restart_confirm", function() {
                        restartDevice(u)
                    })
                } else {
                    errorOverlay()
                }
            })
        };
        D.save = v;

        function v() {
            showLoading();
            var J = D.selectMode();
            u.setSimSelect_with_pwd({
                sim_select: J,
                admin_pwd: D.password()
            }, function(K) {
                if (K.result == "success") {
                    showConfirm("restart_confirm", function() {
                        restartDevice(u)
                    })
                } else {
                    errorOverlay()
                }
            })
        }
        D.restore = function() {
            showConfirm("restore_confirm", function() {
                showLoading("restoring");
                u.restoreFactorySettings({}, function(J) {
                    if (J && J.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, function(J) {
                    if (isErrorObject(J) && J.errorType == "no_auth") {
                        errorOverlay()
                    }
                })
            })
        };
        D.saveRebootDisconnet = function() {
            var J = {
                network_detect_switch: D.selectedType()
            };
            showLoading();
            u.SetDisconnetReboot(J, function(K) {
                if (K && K.result == "success") {
                    successOverlay();
                    showConfirm("restart_confirm2", function() {
                        restartDevice(u)
                    })
                } else {
                    errorOverlay()
                }
            }, function(K) {
                errorOverlay()
            })
        };
        D.restart = function() {
            showConfirm("restart_confirm", function() {
                restartDevice(u)
            })
        };
        D.saveFastBoot = function() {
            showLoading();
            var J = {
                fastbootEnabled: D.fastbootSetting(),
                need_hard_reboot: G.need_hard_reboot
            };
            u.setFastbootSetting(J, function(K) {
                if (K.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        };

        function y() {
            showLoading();
            var J = {
                midnight_reboot_switch: D.select_reboottime(),
                midnight_reboot_hour: parseInt(D.reboottime())
            };
            u.SetRebootTimeEnable(J, function(K) {
                if (K.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        }
        D.turnoff = function() {
            showConfirm("turnoff_confirm", function() {
                showLoading("turnoff");
                u.turnOffDevice({}, function(J) {
                    if (J && J.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, c.noop)
            })
        };
        u.setSNTPDate({
            goformId: "SNTP_Getdatastatic"
        });
        var D = this;
        var A = u.getSntpParams();
        globalTime = new Date(parseInt(A.sntp_year, 10), parseInt(A.sntp_month, 10) - 1, parseInt(A.sntp_day, 10), parseInt(A.sntp_hour, 10), parseInt(A.sntp_minute, 10), parseInt(A.sntp_second, 10));
        D.day = a.observable();
        D.localTime = a.observable();
        D.timeSetModes = a.observableArray(d);
        D.isManualSetTime = a.observable(false);
        D.isAutoSntpTime = a.observable(false);
        D.currentMode = a.observable(A.sntp_time_set_mode);
        z();
        D.changeSetTimeMode = function() {
            z()
        };
        D.currentYear = a.observable(parseInt(A.sntp_year, 10));
        D.currentMonth = a.observable(parseInt(A.sntp_month, 10));
        D.currentDate = a.observable(parseInt(A.sntp_day, 10));
        D.currentHour = a.observable(parseInt(A.sntp_hour, 10));
        D.currentMinute = a.observable(parseInt(A.sntp_minute, 10));
        D.years = a.observableArray(k);
        D.months = a.observableArray(f);
        D.initDateList = function() {
            B();
            D.dates(b)
        };
        B();
        D.dates = a.observableArray(b);
        D.hours = a.observableArray(m);
        D.minutes = a.observableArray(j);
        var E = t.map(A.sntp_servers, function(J) {
            return new Option(J.name, J.value)
        });
        D.serverList = a.observableArray(E);
        D.currentServer0 = a.observable(A.sntp_server0);
        D.currentServer1 = a.observable(A.sntp_server1);
        D.currentServer2 = a.observable(A.sntp_server2);
        D.customServer0 = a.observable(A.sntp_other_server0);
        D.customServer1 = a.observable(A.sntp_other_server1);
        D.customServer2 = a.observable(A.sntp_other_server2);
        D.isOther0 = a.observable(false);
        D.isOther1 = a.observable(false);
        D.isOther2 = a.observable(false);
        w();
        D.changeServerSelect = function() {
            w()
        };
        D.timeZones = a.observableArray(e);
        D.currentTimeZone = a.observable(A.sntp_timezone + "_" + A.sntp_timezone_index);
        D.daylightSaves = a.observableArray(g);
        D.currentDaylightSave = a.observable(A.sntp_dst_enable);
        D.updateCurrentTime = function() {
            var J = globalTime.getDay();
            switch (J) {
                case 6:
                    D.day(c.i18n.prop("saturday"));
                    break;
                case 5:
                    D.day(c.i18n.prop("friday"));
                    break;
                case 4:
                    D.day(c.i18n.prop("thursday"));
                    break;
                case 3:
                    D.day(c.i18n.prop("wednesday"));
                    break;
                case 2:
                    D.day(c.i18n.prop("tuesday"));
                    break;
                case 1:
                    D.day(c.i18n.prop("monday"));
                    break;
                case 0:
                    D.day(c.i18n.prop("sunday"));
                    break;
                default:
                    break
            }
            var K = globalTime.getFullYear() + "-" + getTwoDigit(globalTime.getMonth() + 1) + "-" + getTwoDigit(globalTime.getDate()) + " " + getTwoDigit(globalTime.getHours()) + ":" + getTwoDigit(globalTime.getMinutes()) + ":" + getTwoDigit(globalTime.getSeconds());
            D.localTime(K);
            globalTime.setTime(globalTime.getTime() + 1000)
        };
        D.apply = function() {
            var K = [];
            for (var J = 0; J < A.sntp_servers.length; J++) {
                K.push(A.sntp_servers[J].value)
            }
            var M = u.getStatusInfo();
            if (!checkConnectedStatus(M.connectStatus, M.rj45ConnectStatus, M.connectWifiStatus) && D.currentMode() == "auto") {
                showAlert("sntp_syn_time_wan_connected");
                return
            }
            showLoading("");
            var L = {
                goformId: "SNTP",
                manualsettime: D.currentMode(),
                sntp_server1_ip: D.currentServer0(),
                sntp_server2_ip: D.currentServer1(),
                sntp_server3_ip: D.currentServer2(),
                sntp_other_server0: D.customServer0(),
                sntp_other_server1: D.customServer1(),
                sntp_other_server2: D.customServer2(),
                timezone: D.currentTimeZone().split("_")[0],
                sntp_timezone_index: D.currentTimeZone().split("_")[1],
                DaylightEnabled: D.currentDaylightSave(),
                time_year: D.currentYear(),
                time_month: D.currentMonth(),
                time_day: D.currentDate(),
                time_hour: D.currentHour(),
                time_minute: D.currentMinute()
            };
            u.setSntpSetting(L, function(N) {
                if (N) {
                    if (N.result == "success" && D.currentMode() == "auto") {
                        successOverlay("sntp_req_success")
                    } else {
                        if (N.result == "processing" && D.currentMode() == "auto") {
                            successOverlay("sntp_processing")
                        } else {
                            u.setSNTPDate({
                                goformId: "SNTP_Getdatastatic"
                            }, function(O) {
                                var P = u.getSntpParams();
                                globalTime = new Date(parseInt(P.sntp_year, 10), parseInt(P.sntp_month, 10) - 1, parseInt(P.sntp_day, 10), parseInt(P.sntp_hour, 10), parseInt(P.sntp_minute, 10), parseInt(P.sntp_second, 10));
                                successOverlay()
                            })
                        }
                    }
                } else {
                    errorOverlay()
                }
            })
        };

        function z() {
            if (D.currentMode() == "manual") {
                D.isManualSetTime(true);
                D.isAutoSntpTime(false)
            } else {
                D.isManualSetTime(false);
                D.isAutoSntpTime(true)
            }
            return true
        }

        function B() {
            b = [];
            if (c.inArray(parseInt(D.currentMonth(), 10), l) != -1) {
                q(1, 30, b)
            } else {
                if (c.inArray(parseInt(D.currentMonth(), 10), r) != -1) {
                    q(1, 31, b)
                } else {
                    if (parseInt(D.currentYear(), 10) % 4 == 0) {
                        q(1, 29, b)
                    } else {
                        q(1, 28, b)
                    }
                }
            }
        }

        function w() {
            D.isOther0(D.currentServer0() == "Other");
            D.isOther1(D.currentServer1() == "Other");
            D.isOther2(D.currentServer2() == "Other");
            !D.isOther0() && c("#sntp_server0").find(".error").hide();
            !D.isOther1() && c("#sntp_server1").find(".error").hide();
            !D.isOther2() && c("#sntp_server2").find(".error").hide()
        }
    }

    function n() {
        var w = new o();
        var v = c("#container")[0];
        a.cleanNode(v);
        a.applyBindings(w, v);
        w.updateCurrentTime();
        addInterval(function() {
            w.updateCurrentTime()
        }, 1000);
        c("#sntpForm").validate({
            submitHandler: function() {
                w.apply()
            },
            rules: {
                sntp_other_server0: "sntp_invalid_server_name",
                sntp_other_server1: "sntp_invalid_server_name",
                sntp_other_server2: "sntp_invalid_server_name"
            }
        });
        c("#frmrebootime").validate({
            submitHandler: function() {
                w.saveReboottime()
            },
            rules: {
                reboottimevalue: "rebootNew_check"
            }
        });
        c("#dnsLan").validate({
            submitHandler: function() {
                w.dnsSave()
            },
            rules: {
                dnsIpAddress: {
                    ip_check: true
                }
            }
        })
    }
    return {
        init: n
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
        u.hasUssd = k.HAS_USSD;
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
            u.CurrentBand(verifyDeviceInfo(x.lte_band));
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
